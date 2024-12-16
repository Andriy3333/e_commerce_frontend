import { getCustomerWithId } from './customer_api';
import { getItemWithId } from './item_api';

export const placeOrder = async () => {
  try {
    // Retrieve and parse localStorage data
    const userData = localStorage.getItem('user_data');
    const shoppingCart = localStorage.getItem('shopping_cart');

    if (!userData || !shoppingCart) {
      throw new Error('Missing user data or shopping cart in local storage');
    }

    const user = JSON.parse(userData);
    const cart = JSON.parse(shoppingCart);

    console.log('Parsed user data:', user);
    console.log('Parsed shopping cart:', cart);

    // Validate user and cart data
    const customerID = user?.id;
    if (!customerID) {
      throw new Error('Missing customerID in user data');
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      throw new Error('Shopping cart is empty or invalid');
    }

    // Generate current date string in the format YYYY-MM-DD
    const dateOfPurchase = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });

    console.log(dateOfPurchase);

    // Process each item in the cart
    const results = [];
    for (const item of cart) {
      // Validate item data
      if (!item.itemID || !item.amountOrdered) {
        console.error(`Skipping invalid item: ${JSON.stringify(item)}`);
        continue;
      }

      // Construct the order request
      const orderRequest = {
        customerID,
        itemID: item.itemID,
        amount: item.amountOrdered,
        dateOfPurchase,
      };

      console.log('Sending order request:', orderRequest);

      // Send the order
      try {
        const response = await fetch('http://35.183.86.101/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderRequest),
        });

        if (!response.ok) {
          throw new Error(`Failed to place order for itemID ${item.itemID}: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Order placed successfully:', responseData);

        results.push({
          success: true,
          itemID: item.itemID,
          responseData,
          ...item, // Include item attributes for order summary
        });
      } catch (error) {
        console.error(`Error placing order for itemID ${item.itemID}:`, error);
        results.push({ success: false, itemID: item.itemID, error: error.message });
      }
    }

    // Save order summary and date to localStorage
    const successfulOrders = results.filter((result) => result.success);
    localStorage.setItem('orders', JSON.stringify(successfulOrders));
    localStorage.setItem('last_order_date', dateOfPurchase);

    // Clear the shopping cart if all items were successfully processed
    if (successfulOrders.length === cart.length) {
      console.log('All orders placed successfully. Clearing shopping cart.');
      localStorage.removeItem('shopping_cart');
    } else {
      console.warn(
        'Some items failed to process. Shopping cart will not be cleared.',
        results.filter((result) => !result.success)
      );
    }

    // Log results and return them
    console.log('Order results:', results);
    return results;
  } catch (error) {
    console.error('Error placing orders:', error);
    throw error;
  }
};


 // Fetch all orders and enrich them with user and item data
export const getAllOrders = async () => {
  try {
    const response = await fetch('http://35.183.86.101/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const orders = await response.json();
    console.log('Raw orders fetched:', orders);

    // Enrich each order with customer and item details
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        try {
          const userDetails = await getCustomerWithId(order.customerID);
          console.log(`Enriching order ${order.id} with user:`, userDetails);

          const itemDetails = order.itemID
            ? await getItemWithId(order.itemID)
            : {};

          console.log(`Enriching order ${order.itemID} with item:`, itemDetails);

          return {
            ...order,
            user: userDetails,
            item: itemDetails,
          };
        } catch (error) {
          console.error(`Error enriching order ${order.id}:`, error);
          return order; // Fallback to just the original order
        }
      })
    );

    return enrichedOrders;
  } catch (error) {
    console.error('Error fetching and enriching all orders:', error);
    throw error;
  }
};
  

export const getUserOrders = async (userId: string) => {
  try {
    const response = await fetch(
      `http://35.183.86.101/order/user/${encodeURIComponent(userId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }

    const orders = await response.json();
    console.log('Fetched raw user orders:', orders);

    // Enrich each order with item details
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        if (order.itemID) {
          try {
            const itemDetails = await getItemWithId(order.itemID);
            console.log(`Enriching order ${order.itemID} with:`, itemDetails);

            return {
              ...order,
              ...itemDetails, // Merge order data with item details
            };
          } catch (error) {
            console.error(`Failed to fetch item details for order ${order.itemId}`, error);
            return order; // Fallback to just the original order if item details fail
          }
        }
        return order; // No itemId? Just return the original order
      })
    );

    return enrichedOrders;
  } catch (error) {
    console.error('Error fetching user order history and enriching with item details:', error);
    throw error;
  }
};
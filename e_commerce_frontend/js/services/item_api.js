export const getAllItems = async () => {
    try {
        const response = await fetch('http://35.183.86.101/item', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const items = await response.json();
        return items; // return the fetched items
    }
    catch (error) {
        console.error('Error fetching items:', error);
        throw error; // or return an error message
    }
};
export const updateItemQuantity = async (item, newQuantity) => {
    try {
        // Update the item's quantity
        const updatedItem = { ...item, quantity: newQuantity };
        console.log(updatedItem);
        // Send the updated item to the backend for saving
        const response = await fetch('http://35.183.86.101/item/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        });
        if (!response.ok) {
            throw new Error('Failed to update item quantity');
        }
        const updatedResponse = await response.json();
        return updatedResponse; // Return the updated item
    }
    catch (error) {
        console.error('Controller error updating item quantity:', error);
        throw error; // or return an error message
    }
};
export const getItemWithId = async (id) => {
    const apiUrl = `http://35.183.86.101/item/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch item with ID ${id}`);
        }
        const item = await response.json();
        console.log("bruh:" + item);
        // Format the response to match the required structure
        return {
            itemID: item.id, // Map API `id` to `itemID`
            category: item.category || 'Unknown', // Fallback if no category is present
            description: item.description || 'No description available',
            name: item.name || 'Unnamed Item',
            brand: item.brand || 'Generic',
            price: item.price || 0,
            quantity: item.quantity || 0,
            image: item.image || '', // Fallback to an empty string if image is not provided
        };
    }
    catch (error) {
        console.error(`Error fetching item with ID ${id}:`, error);
        throw error; // Propagate the error for further handling
    }
};

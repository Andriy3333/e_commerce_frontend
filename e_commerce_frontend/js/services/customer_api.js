const API_URL = 'http://35.183.86.101/customer'; // Backend API URL
const ADDRESS_API_URL = 'http://35.183.86.101/address'; // Address API URL
const BILLING_API_URL = 'http://35.183.86.101/billing'; // Billing API URL
// Customer Login Method
export const customerLogin = async (username, password) => {
    try {
        // Step 1: Fetch the customer data
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const customer = await response.json();
            localStorage.setItem('user_data', JSON.stringify(customer));
            console.log(customer.addressID);
            await getCustomerAddress(customer.addressID);
            await getCustomerBillingInfo(customer.id);
            return customer;
        }
        else {
            console.log('Invalid credentials.');
            return null;
        }
    }
    catch (error) {
        console.error('An error occurred during login:', error);
        return null;
    }
};
// Register Customer Method
export const registerCustomer = async (registerRequest) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerRequest),
        });
        if (response.ok) {
            console.log('Registration successful');
            return true;
        }
        else {
            console.log('Registration failed');
            return false;
        }
    }
    catch (error) {
        console.error('Error during registration:', error);
        return false;
    }
};
// Fetch Customer Address Method
export const getCustomerAddress = async (addressID) => {
    try {
        // Pass addressID as a query parameter 'id'
        const response = await fetch(`${ADDRESS_API_URL}?id=${addressID}`, {
            method: 'GET',
        });
        if (response.ok) {
            const addressData = await response.json();
            console.log(addressData);
            console.log('Address fetched successfully:', addressData);
            // Store the address data in localStorage as JSON string
            localStorage.setItem('address', JSON.stringify(addressData));
            return addressData;
        }
        else {
            console.log('Failed to fetch address.');
            return null;
        }
    }
    catch (error) {
        console.error('An error occurred while fetching address:', error);
        return null;
    }
};
// Fetch Customer Billing Info Method
export const getCustomerBillingInfo = async (id) => {
    try {
        // Pass billingID as a query parameter 'id'
        const billingID = id;
        const response = await fetch(`${BILLING_API_URL}?id=${billingID}`, {
            method: 'GET',
        });
        if (response.ok) {
            const billingData = await response.json();
            console.log('Billing fetched successfully:', billingData);
            // Store the billing data in localStorage as JSON string
            localStorage.setItem('billing', JSON.stringify(billingData));
            return billingData;
        }
        else {
            console.log('Failed to fetch billing.');
            return null;
        }
    }
    catch (error) {
        console.error('An error occurred while fetching billing:', error);
        return null;
    }
};
export const updateCustomer = async (updatedCustomer) => {
    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST', // Change to POST since the backend uses @PostMapping
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        });
        if (response.ok) {
            const customerData = await response.json();
            // Update the local storage with the updated data
            localStorage.setItem('user_data', JSON.stringify(customerData));
            console.log('Customer saved successfully:', customerData);
            return true;
        }
        else {
            console.log('Failed to save customer.');
            return false;
        }
    }
    catch (error) {
        console.error('An error occurred while saving customer:', error);
        return false;
    }
};
export const updateAddress = async (updatedAddress) => {
    try {
        const response = await fetch(`${ADDRESS_API_URL}`, {
            method: 'POST', // Change to POST since the backend uses @PostMapping("")
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAddress),
        });
        if (response.ok) {
            const addressData = await response.json();
            // Update localStorage with the new address data
            localStorage.setItem('address', JSON.stringify(addressData));
            console.log('Address updated successfully:', addressData);
            return true;
        }
        else {
            console.log('Failed to update address.');
            return false;
        }
    }
    catch (error) {
        console.error('An error occurred while updating the address:', error);
        return false;
    }
};
export const updateBillingInfo = async (updatedBilling) => {
    try {
        const response = await fetch(`${BILLING_API_URL}/update`, {
            method: 'POST', // Change to POST since the backend uses @PostMapping("/update")
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBilling),
        });
        if (response.ok) {
            const billingData = await response.json();
            // Update localStorage with the new billing info
            localStorage.setItem('billing', JSON.stringify(billingData));
            console.log('Billing info updated successfully:', billingData);
            return true;
        }
        else {
            console.log('Failed to update billing info.');
            return false;
        }
    }
    catch (error) {
        console.error('An error occurred while updating billing info:', error);
        return false;
    }
};
// Writes all local storage data to database
export const updateAllInfo = async () => {
    try {
        // Fetch data from localStorage
        const userData = localStorage.getItem('user_data');
        const addressData = localStorage.getItem('address');
        const billingData = localStorage.getItem('billing');
        if (!userData || !addressData || !billingData) {
            console.log('One or more pieces of data are missing in localStorage.');
            return false;
        }
        // Parse the data from localStorage
        const parsedUserData = JSON.parse(userData);
        const parsedAddressData = JSON.parse(addressData);
        const parsedBillingData = JSON.parse(billingData);
        // Update customer, address, and billing info
        const customerUpdate = await updateCustomer(parsedUserData);
        const addressUpdate = await updateAddress(parsedAddressData);
        const billingUpdate = await updateBillingInfo(parsedBillingData);
        // Return true if all updates were successful
        if (customerUpdate && addressUpdate && billingUpdate) {
            console.log('All information updated successfully.');
            return true;
        }
        else {
            console.log('One or more updates failed.');
            return false;
        }
    }
    catch (error) {
        console.error('An error occurred while updating all information:', error);
        return false;
    }
};
export const getCustomerWithId = async (id) => {
    const apiUrl = `http://35.183.86.101/customer/${id}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch customer with ID ${id}`);
        }
        const customer = await response.json();
        console.log("Customer Data: ", customer);
        // Format the response to ensure expected structure
        return {
            customerID: customer.id,
            firstName: customer.firstName || 'Unknown',
            lastName: customer.lastName || 'Unknown',
            email: customer.email || 'No email provided',
            phoneNumber: customer.phone || 'No phone number',
            address: customer.addressID || 'No address',
        };
    }
    catch (error) {
        console.error(`Error fetching customer with ID ${id}:`, error);
        throw error; // Propagate the error
    }
};
// Fetch All Customers
export const getAllCustomer = async () => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const customers = await response.json();
            console.log('Fetched all customers successfully:', customers);
            return customers;
        }
        else {
            console.log('Failed to fetch customers.');
            return null;
        }
    }
    catch (error) {
        console.error('An error occurred while fetching customers:', error);
        return null;
    }
};

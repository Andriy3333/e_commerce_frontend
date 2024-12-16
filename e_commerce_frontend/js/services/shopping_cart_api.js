'use client';
import { useState, useEffect } from 'react';
const CART_KEY = 'shopping_cart';
// Utility functions for localStorage
const getCartFromLocalStorage = () => {
    if (typeof window === 'undefined')
        return [];
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
};
const saveCartToLocalStorage = (cart) => {
    const storedCart = getCartFromLocalStorage();
    if (JSON.stringify(storedCart) !== JSON.stringify(cart)) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
};
// Custom hook for shopping cart
export const useShoppingCart = () => {
    const [cart, setCart] = useState([]);
    const [cartStatus, setCartStatus] = useState('');
    useEffect(() => {
        const storedCart = getCartFromLocalStorage();
        setCart(storedCart);
    }, []); // Only run on mount
    const addItemToCart = (item) => {
        // Set amountOrdered to 1 by default if not provided
        const itemWithDefaultAmountOrdered = { ...item, amountOrdered: item.amountOrdered || 1 };
        setCart((prevCart) => {
            const itemExists = prevCart.some((cartItem) => cartItem.name === itemWithDefaultAmountOrdered.name);
            if (itemExists) {
                setCartStatus('Item already in cart');
                return prevCart;
            }
            else {
                const updatedCart = [...prevCart, itemWithDefaultAmountOrdered];
                saveCartToLocalStorage(updatedCart);
                setCartStatus('Item added successfully');
                return updatedCart;
            }
        });
    };
    const updateAmountOrdered = (itemID, newAmount) => {
        // Find the item by name in the cart
        const item = cart.find((cartItem) => cartItem.itemID === itemID);
        if (!item) {
            setCartStatus('Item not found');
            return false; // Item not found
        }
        // Check if the new amount is valid (not larger than quantity)
        if (newAmount > item.quantity) {
            setCartStatus('Amount ordered cannot exceed available quantity');
            return false; // Return false if new amount exceeds quantity
        }
        setCart((prevCart) => {
            // Update the amountOrdered for the item
            const updatedCart = prevCart.map((cartItem) => cartItem.itemID === itemID ? { ...cartItem, amountOrdered: newAmount } : cartItem);
            saveCartToLocalStorage(updatedCart);
            setCartStatus('Item amount updated');
            return updatedCart;
        });
        return true; // Successfully updated
    };
    const removeItemFromCart = (itemID) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((cartItem) => cartItem.itemID !== itemID);
            saveCartToLocalStorage(updatedCart); // Ensure cart is saved to localStorage
            return updatedCart; // Update state with the filtered cart
        });
    };
    const clearCart = () => {
        setCart([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(CART_KEY);
        }
    };
    return { cart, addItemToCart, removeItemFromCart, clearCart, updateAmountOrdered, cartStatus };
};

'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useShoppingCart } from '@/services/shopping_cart_api';
import EditAmountOrdered from '@/components/EditAmountOrdered';
// Define the columns for the catalog table view
export const shopping_columns = [
    {
        accessorKey: 'name', // Accessor for the item name
        header: 'Product Name', // User-facing column name
    },
    {
        accessorKey: 'price', // Accessor for the item price
        header: 'Price', // User-facing column name
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'));
            const formatted = new Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD',
            }).format(price); // Format price in Canadian dollars (CAD)
            return <div className='font-medium'>{formatted}</div>;
        },
    },
    {
        accessorKey: 'quantity', // Accessor for the item quantity
        header: () => <div className='text-left'>In-stock</div>, // Left-align the header
        cell: ({ row }) => {
            const quantity = row.getValue('quantity');
            return <div className='text-left font-medium'>{quantity}</div>; // Left-align the cell content
        },
    },
    {
        accessorKey: 'amountOrdered', // Accessor for the item quantity
        header: () => <div className='text-left'>Quantity</div>, // Left-align the header
        cell: ({ row }) => {
            const amountOrdered = row.getValue('amountOrdered');
            return <div className='text-left font-medium'>{amountOrdered}</div>; // Left-align the cell content
        },
    },
    {
        id: 'editQuantity',
        cell: ({ row }) => {
            const item = row.original;
            return (<div className='flex justify-center'>
          {/* Pass the item to the EditQuantityDialog */}
          <EditAmountOrdered itemID={item.itemID} quantity={item.quantity}/>
        </div>);
        },
    },
    {
        id: 'removeItem', // Remove Item column
        cell: ({ row }) => {
            const item = row.original; // Get the current item
            const { removeItemFromCart } = useShoppingCart(); // Get the removeItemFromCart function from the hook
            const handleRemove = () => {
                removeItemFromCart(item.itemID); // Call the function to remove the item by itemID
                window.location.reload(); // Refresh the page after removal
            };
            return (<div className='flex justify-center'>
          <Button variant='destructive' onClick={handleRemove}>
            Remove
          </Button>
        </div>);
        },
    },
];

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { useShoppingCart } from '@/services/shopping_cart_api';
import EditAmountOrdered from '@/components/EditAmountOrdered';

export type Item = {
  itemID: number;
  category: string; // Category of the item (e.g., electronics, clothing)
  description: string; // Description of the item
  name: string; // Name of the item
  brand: string; // Brand of the item
  price: number; // Price of the item (in cents or dollars)
  quantity: number; // Quantity available in stock
  amountOrdered: number; // Amount ordered by the user
};

// Define the columns for the catalog table view
export const shopping_columns: ColumnDef<Item>[] = [
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
      const quantity = row.getValue<number>('quantity');
      return <div className='text-left font-medium'>{quantity}</div>; // Left-align the cell content
    },
  },
  {
    accessorKey: 'amountOrdered', // Accessor for the item quantity
    header: () => <div className='text-left'>Quantity</div>, // Left-align the header
    cell: ({ row }) => {
      const amountOrdered = row.getValue<number>('amountOrdered');
      return <div className='text-left font-medium'>{amountOrdered}</div>; // Left-align the cell content
    },
  },
  {
    id: 'editQuantity',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className='flex justify-center'>
          {/* Pass the item to the EditQuantityDialog */}
          <EditAmountOrdered itemID={item.itemID} quantity={item.quantity} />
        </div>
      );
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

      return (
        <div className='flex justify-center'>
          <Button variant='destructive' onClick={handleRemove}>
            Remove
          </Button>
        </div>
      );
    },
  },
];

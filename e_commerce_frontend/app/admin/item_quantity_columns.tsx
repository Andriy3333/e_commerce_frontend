'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import EditAmountInStock from '@/components/EditAmountInStock';

type Item = {
  itemID: number;
  category: string; // Category of the item (e.g., electronics, clothing)
  description: string; // Description of the item
  name: string; // Name of the item
  brand: string; // Brand of the item
  price: number; // Price of the item (in cents or dollars)
  quantity: number; // Quantity available in stock
  amountOrdered: number; // Amount ordered by the user
};

export const ItemQuantityColumns: ColumnDef<Item>[] = [
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
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    id: 'editQuantity',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className='flex justify-center'>
          {/* Pass the item to the EditQuantityDialog */}
          <EditAmountInStock item={item} />
        </div>
      );
    },
  },
];

'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import EditAmountInStock from '@/components/EditAmountInStock';

type Item = {
  itemID: number;
  category: string;
  description: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  amountOrdered: number;
};

export const ItemQuantityColumns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
      }).format(price);

      return <div className='font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'quantity',
    header: () => <div className='text-left'>In-stock</div>,
    cell: ({ row }) => {
      const quantity = row.getValue<number>('quantity');
      return <div className='text-left font-medium'>{quantity}</div>;
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

      // Define the refreshItems function
      const refreshItems = () => {
        console.log('Refreshing item list...');
        // Add logic to refresh items, e.g., re-fetch data from the server
      };

      return (
        <div className='flex justify-center'>
          {/* Pass both the item and refreshItems to EditAmountInStock */}
          <EditAmountInStock item={item} refreshItems={refreshItems} />
        </div>
      );
    },
  },
];

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import AddToCartButton from '../../components/AddToCartButton';

export type Item = {
  category: string; // Category of the item (e.g., electronics, clothing)
  description: string; // Description of the item
  name: string; // Name of the item
  brand: string; // Brand of the item
  price: number; // Price of the item (in cents or dollars)
  quantity: number; // Quantity available in stock
  itemID: number;
};

// Define the columns for the catalog table view
export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name', // Accessor for the item name
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    header: 'Brand',
    accessorKey: 'brand', // Accessor for the item brand
  },
  {
    header: 'Category',
    accessorKey: 'category', // Accessor for the item category
  },
  {
    accessorKey: 'price', // Accessor for the item price
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
      }).format(price); // Format price in Canadian dollars (CAD)

      return <div className='font-medium'>{formatted}</div>;
    },
  },
];

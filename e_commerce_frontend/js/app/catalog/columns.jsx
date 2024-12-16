'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
// Define the columns for the catalog table view
export const columns = [
    {
        accessorKey: 'name', // Accessor for the item name
        header: ({ column }) => {
            return (<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>);
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
            return (<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Price
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>);
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

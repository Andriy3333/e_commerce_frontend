'use client';

import React, { useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton'; // Import the skeleton component
import { getAllOrders } from '@/services/order_api';
import { OrderHistoryColumns } from './order_history_columns';

// Enriched order type that includes user and item fields
type EnrichedOrder = {
  id: number;
  customerID: number;
  dateOfPurchase: string;
  user: {
    firstName: string;
    lastName: string;
  };
  item: {
    itemID: number;
    name: string;
    category: string;
    price: number;
  };
};

export function OrderHistoryTable() {
  const [orders, setOrders] = useState<EnrichedOrder[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch data from API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Start loading
      try {
        const response = await getAllOrders();
        console.log('Enriched orders:', response);
        setOrders(response);
      } catch (error) {
        console.error('Failed to fetch order history:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchOrders();
  }, []);

  const table = useReactTable({
    data: orders,
    columns: OrderHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 7,
      },
      sorting: [
        {
          id: 'dateOfPurchase',
          desc: true,
        },
      ],
    },
  });

  if (loading) {
    // Show skeleton while loading
    return (
      <div className='p-4'>
        <div className='rounded-md border bg-white bg-opacity-70 mt-2 p-4'>
          {/* Skeleton Header */}
          <Skeleton className='h-6 w-full mb-4' />
          {/* Skeleton Rows */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className='flex items-center space-x-2'>
              <Skeleton className='h-4 w-1/6' />
              <Skeleton className='h-4 w-1/3' />
              <Skeleton className='h-4 w-1/4' />
              <Skeleton className='h-4 w-1/5' />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <div className='rounded-md border bg-white bg-opacity-70 mt-2'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} onClick={() => table.setSorting([{ id: header.id, desc: true }])}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={OrderHistoryColumns.length} className='h-16 text-center text-sm'>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='mt-4 flex items-center justify-between py-2'>
        <div className='text-xs'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className='space-x-1'>
          <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

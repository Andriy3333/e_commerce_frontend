'use client';

import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { getUserOrders } from '@/services/order_api'; // Adjust the path to your service file
import { userOrderHistoryColumns, Order } from './user_order_history_columns';

export function UserOrderHistoryTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch the user ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const response = await getUserOrders(userId);
          console.log(response);
          setOrders(response);
        } catch (error) {
          console.error('Failed to fetch user order history:', error);
        }
      };
      fetchOrders();
    }
  }, [userId]);

  const table = useReactTable({
    data: orders,
    columns: userOrderHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), // Enable sorting functionality
    initialState: {
      pagination: {
        pageSize: 8,
      },
      sorting: [
        {
          id: 'dateOfPurchase',
          desc: true, // Sort by date descending by default
        },
      ],
    },
  });

  return (
    <div className='p-4'>
      {/* User Order History Table */}
      <div className='rounded-md border bg-white shadow-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='text-sm py-1 cursor-pointer'
                    onClick={
                      () => table.setSorting([{ id: header.id, desc: true }]) // Allow dynamic sorting by clicking on the column
                    }
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-2 text-sm'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={userOrderHistoryColumns.length} className='h-16 text-center text-sm'>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className='mt-4 flex items-center justify-between py-2'>
        {/* Pagination Info */}
        <div className='text-xs'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        {/* Pagination Buttons */}
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

export default UserOrderHistoryTable;

'use client';
import React, { useEffect, useState } from 'react';
import { flexRender, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllOrders } from '@/services/order_api';
import { OrderHistoryColumns } from './order_history_columns';
// Main OrderHistoryTable Component
export function OrderHistoryTable() {
    const [orders, setOrders] = useState([]);
    // Fetch data from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders();
                console.log('Enriched orders:', response);
                setOrders(response);
            }
            catch (error) {
                console.error('Failed to fetch order history:', error);
            }
        };
        fetchOrders();
    }, []);
    const table = useReactTable({
        data: orders,
        columns: OrderHistoryColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(), // Enable sorting
        initialState: {
            pagination: {
                pageSize: 8,
            },
            sorting: [
                {
                    id: 'dateOfPurchase',
                    desc: true, // Sort by date descending
                },
            ],
        },
    });
    return (<div className='p-4'>
      {/* Order History Table */}
      <div className='rounded-md border bg-white bg-opacity-70 mt-2'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (<TableHead key={header.id} onClick={() => table.setSorting([{ id: header.id, desc: true }])} // Enable sorting on click
            >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>))}
              </TableRow>))}
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>))}
                </TableRow>))) : (<TableRow>
                <TableCell colSpan={OrderHistoryColumns.length} className='h-16 text-center text-sm'>
                  No orders found.
                </TableCell>
              </TableRow>)}
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
    </div>);
}

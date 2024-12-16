'use client';

import React from 'react';
import { ColumnDef, flexRender, useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export type Item = {
  name: string;
  price: number;
  category: string;
  brand: string;
  amountOrdered: number;
};

interface DataTableProps<TData extends { price: number; amountOrdered: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ShoppingTable<TData extends { price: number; amountOrdered: number }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6, // Initial page size
      },
    },
  });

  // Calculate the total price
  const totalPrice = data.reduce((total, item) => total + item.price * item.amountOrdered, 0);

  return (
    <div className='p-4'>
      {/* Table Container */}
      <div className='rounded-md border bg-white bg-opacity-70 mt-4'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='cursor-pointer hover:bg-gray-100'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Total Price Display */}
      <div className='text-lg font-medium mt-4'>Total Price: ${totalPrice.toFixed(2)}</div>

      {/* Pagination Controls */}
      <div className='flex items-center justify-between py-4'>
        {/* Page Info */}
        <div className='text-sm'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        {/* Pagination Buttons */}
        <div className='flex space-x-2'>
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

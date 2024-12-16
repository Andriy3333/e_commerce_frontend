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
import { Skeleton } from '@/components/ui/skeleton';
import { getAllOrders } from '@/services/order_api';
import { OrderHistoryColumns } from './order_history_columns';

// Enriched order type
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
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    dateOfPurchase: '',
    itemName: '',
  });

  const [tableData, setTableData] = useState<EnrichedOrder[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllOrders();
        console.log('Fetched orders:', response);
        setOrders(response);
        sortAndSetData(response);
      } catch (error) {
        console.error('Error fetching order history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Function to sort data by date in descending order
  const sortAndSetData = (orders: EnrichedOrder[]) => {
    const sortedOrders = orders.sort((a, b) => new Date(b.dateOfPurchase).getTime() - new Date(a.dateOfPurchase).getTime());
    setTableData(sortedOrders);
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter logic
  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesFirstName = filters.firstName
        ? order.user.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
        : true;
      const matchesLastName = filters.lastName
        ? order.user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
        : true;
      const matchesDate = filters.dateOfPurchase ? order.dateOfPurchase.includes(filters.dateOfPurchase) : true;
      const matchesItemName = filters.itemName
        ? order.item.name.toLowerCase().includes(filters.itemName.toLowerCase())
        : true;

      return matchesFirstName && matchesLastName && matchesDate && matchesItemName;
    });

    sortAndSetData(filtered);
  }, [filters, orders]);

  const table = useReactTable({
    data: tableData,
    columns: OrderHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });

  if (loading) {
    return (
      <div className='p-4'>
        <div className='rounded-md border bg-white bg-opacity-70 mt-2 p-4'>
          <Skeleton className='h-6 w-full mb-4' />
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
      {/* Filter Inputs */}
      <div className='mb-4 space-x-2'>
        <input
          type='text'
          name='firstName'
          placeholder='Filter by First Name'
          className='border p-2 rounded'
          value={filters.firstName}
          onChange={handleFilterChange}
        />
        <input
          type='text'
          name='lastName'
          placeholder='Filter by Last Name'
          className='border p-2 rounded'
          value={filters.lastName}
          onChange={handleFilterChange}
        />
        <input
          type='text'
          name='dateOfPurchase'
          placeholder='Filter by Date of Purchase'
          className='border p-2 rounded'
          value={filters.dateOfPurchase}
          onChange={handleFilterChange}
        />
        <input
          type='text'
          name='itemName'
          placeholder='Filter by Item Name'
          className='border p-2 rounded'
          value={filters.itemName}
          onChange={handleFilterChange}
        />
      </div>

      {/* Table */}
      <div className='rounded-md border bg-white bg-opacity-70 mt-2'>
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={OrderHistoryColumns.length} className='text-center'>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Navigation Buttons at bottom-right */}
      <div className='flex space-x-1 justify-end mt-2'>
        <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}

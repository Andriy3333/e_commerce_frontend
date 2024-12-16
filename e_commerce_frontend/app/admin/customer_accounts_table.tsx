import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { customerAccountsColumns } from './customer_accounts_column';
import { customerLogin, getAllCustomer } from '@/services/customer_api';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export const CustomerAccountsTable = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch customer data
  useEffect(() => {
    const fetchCustomerAccounts = async () => {
      try {
        const response = await getAllCustomer();
        if (response) {
          setCustomers(response);
        } else {
          setError('Failed to fetch customers.');
        }
      } catch (err) {
        console.error('Error fetching customer data:', err);
        setError('An unexpected error occurred while fetching customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAccounts();
  }, []);

  const table = useReactTable({
    data: customers,
    columns: customerAccountsColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 6,
      },
      sorting: [
        {
          id: 'id',
          desc: true,
        },
      ],
    },
  });

  const handleEdit = async (customer: Customer) => {
    await customerLogin(customer.username, customer.password);

    router.push('admin/edit');
  };

  if (loading) {
    return <div>Loading customer accounts...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  return (
    <div className='p-2'>
      <div className='rounded-md border bg-white bg-opacity-70 mt-2'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : typeof header.column.columnDef.header === 'function'
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{cell.getValue() as React.ReactNode}</TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant='outline'
                      className='h-7 w-12 px-4 text-s'
                      onClick={() => handleEdit(row.original as Customer)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={customerAccountsColumns.length + 1} className='text-center text-sm'>
                  No customer accounts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between py-2'>
        {/* Page Info */}
        <div className='text-xs'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        {/* Pagination Buttons */}
        <div className='flex space-x-1'>
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
};

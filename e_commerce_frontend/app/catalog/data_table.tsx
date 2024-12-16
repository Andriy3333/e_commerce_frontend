'use client';

import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import ItemDescription from '@/components/ItemDescription';
import { useShoppingCart } from '../../services/shopping_cart_api';
import CartStatusPopup from '@/components/CartStatusPopup';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedRow, setSelectedRow] = React.useState<TData | null>(null); // Track the selected row
  const [showStatusPopup, setShowStatusPopup] = React.useState(false); // To track popup visibility
  const [cartStatusMessage, setCartStatusMessage] = React.useState(''); // Status message

  const { cart, addItemToCart } = useShoppingCart(); // Use the shopping cart hook

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Handle row click and show the description popup
  const handleRowClick = (rowData: TData) => {
    setSelectedRow(rowData); // Set the clicked row as selected
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setSelectedRow(null); // Close the dialog by clearing the selected row
  };

  // Handle adding item to cart with status
  const handleAddToCart = (item: any) => {
    // Check if item is already in the cart
    const itemExists = cart.some((cartItem) => cartItem.name === item.name);

    if (itemExists) {
      setCartStatusMessage('Item already in cart');
    } else {
      addItemToCart(item); // Add item to cart
      setCartStatusMessage('Item added successfully');
    }

    setShowStatusPopup(true); // Show the status popup
  };

  return (
    <div>
      <div className='flex flex-row space-x-4'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Filter by category...'
            value={
              (table.getColumn('category')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('category')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Filter by brand...'
            value={(table.getColumn('brand')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('brand')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
      </div>

      <div className='rounded-md border bg-white bg-opacity-70'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                  onClick={() => handleRowClick(row.original)} // Pass row data when clicked
                  className='cursor-pointer'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pass the selectedRow and handlers to ItemDescription */}
      <ItemDescription
        selectedRow={selectedRow}
        onClose={handleCloseDialog}
        onAddToCart={handleAddToCart} // Pass handleAddToCart instead of addItemToCart
      />

      {/* Cart Status Popup */}
      <CartStatusPopup
        statusMessage={cartStatusMessage}
        open={showStatusPopup}
        onClose={() => setShowStatusPopup(false)}
      />

      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

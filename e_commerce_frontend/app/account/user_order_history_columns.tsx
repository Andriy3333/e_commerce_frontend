import { ColumnDef } from '@tanstack/react-table';

export type Order = {
  id: string;
  itemName: string;
  amount: number;
  dateOfPurchase: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  quantity: number;
};

export const userOrderHistoryColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'dateOfPurchase',
    header: 'Date of Purchase',
    cell: ({ row }) => row.getValue('dateOfPurchase') || 'Unknown Date',
    enableSorting: true,
  },
  {
    accessorKey: 'name',
    header: 'Item Name',
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    },
    enableSorting: true,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.getValue('category') || 'N/A',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => row.getValue('description') || 'No description available',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    cell: ({ row }) => row.getValue('brand') || 'Generic',
  },
];

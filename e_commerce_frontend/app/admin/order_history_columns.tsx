import { ColumnDef } from '@tanstack/react-table';

// Enriched order type fields
type EnrichedOrder = {
  id: number;
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

export const OrderHistoryColumns: ColumnDef<EnrichedOrder>[] = [
  {
    accessorKey: 'dateOfPurchase',
    header: 'Date of Purchase',
  },
  {
    accessorKey: 'user.firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'user.lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'item.name',
    header: 'Item Name',
  },
  {
    accessorKey: 'item.price',
    header: 'Item Price',
    cell: ({ getValue }) => {
      const value = getValue() as number; // Explicitly type the value as a number
      return `$${value.toFixed(2)}`; // Format price to dollar with 2 decimal points
    },
  },
];

import { ColumnDef } from '@tanstack/react-table';

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

// Correctly typed with `ColumnDef<Customer, any>[]`
export const customerAccountsColumns: ColumnDef<Customer, any>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
];

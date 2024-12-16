import { ColumnDef } from '@tanstack/react-table';

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export const customerAccountsColumns: ColumnDef<Customer>[] = [
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

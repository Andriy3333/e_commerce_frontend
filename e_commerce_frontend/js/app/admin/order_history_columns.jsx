export const OrderHistoryColumns = [
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
            const value = getValue();
            return `$${value.toFixed(2)}`; // Format price to dollar with 2 decimal points
        },
    },
];

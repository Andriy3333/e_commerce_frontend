'use client';
import React, { useEffect, useState } from 'react';
import { ItemQuantityColumns } from './item_quantity_columns';
import { getAllItems } from '@/services/item_api';
import { ItemQuantityTable } from './item_quantity_table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerAccountsTab from '@/components/CustomerAccountsTab';
import SalesHistoryTab from '@/components/SalesHistoryTab';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AdminLogin from '@/components/AdminLogin';
import { useRouter } from 'next/navigation';
async function getItemData() {
    return await getAllItems();
}
const Page = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // New state to track loading status
    const router = useRouter();
    useEffect(() => {
        const adminStatus = localStorage.getItem('is_admin');
        setIsAdmin(adminStatus === 'true');
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const items = await getItemData();
            setData(items);
            setLoading(false); // Set loading to false after data is fetched
        };
        fetchData();
    }, []);
    const handleLogout = () => {
        localStorage.setItem('is_admin', 'false'); // Set is_admin to false
    };
    if (loading) {
        return null; // Render nothing while loading
    }
    if (localStorage.getItem('user_data')) {
        return (<div className='flex items-center justify-center min-h-screen'>
        <div className='p-8 bg-white rounded-lg shadow-md text-center'>
          <h1 className='text-lg font-semibold text-gray-700'>You must first log out of user account</h1>
          <Button variant='outline' className='text-lg font-bold py-3 px-6 w-full sm:w-auto cursor-pointer mt-5' onClick={() => router.push('/')} // Navigate to home
        >
            Back to Home
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'>
              <path fillRule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'/>
            </svg>
          </Button>
        </div>
      </div>);
    }
    if (!isAdmin || isAdmin == null) {
        return <AdminLogin />;
    }
    return (<div className='container mx-auto py-10 min-h-screen flex flex-col'>
      <Tabs defaultValue='customer-accounts' className='w-full'>
        <TabsList className='grid grid-cols-3'>
          <TabsTrigger value='modify-quantities'>Modify Quantities</TabsTrigger>
          <TabsTrigger value='customer-accounts'>Customer Accounts</TabsTrigger>
          <TabsTrigger value='sales-history'>Sales History</TabsTrigger>
        </TabsList>

        <TabsContent value='modify-quantities'>
          <ItemQuantityTable columns={ItemQuantityColumns} data={data}/>
        </TabsContent>

        <TabsContent value='customer-accounts'>
          <CustomerAccountsTab />
        </TabsContent>

        <TabsContent value='sales-history'>
          <SalesHistoryTab />
        </TabsContent>
      </Tabs>

      <div className='flex justify-center'>
        <Link href='/'>
          <Button variant='outline' className='text-lg font-bold py-3 px-6 cursor-pointer' onClick={handleLogout} // Call handleLogout when the button is clicked
    >
            Log out of Admin Account
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'>
              <path fillRule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'/>
            </svg>
          </Button>
        </Link>
      </div>
    </div>);
};
export default Page;

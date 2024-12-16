'use client';
import React, { useState, useEffect } from 'react';
import UserProfile from '@/components/UserProfile';
import AccountInitialization from '@/components/AccountInitialization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserOrderHistory from '@/components/UserOrderHistory';
import LogOutButton from '@/components/LogOutButton';
import { Button } from '@/components/ui/button';
import { updateAllInfo } from '@/services/customer_api';
const Account = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const handleBackToHome = async () => {
        const success = await updateAllInfo();
        if (success) {
            // Navigate to the home page if all information updates are successful
            window.location.href = '/';
        }
        else {
            alert('Failed to update information. Please try again.');
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('user_data');
            if (userData) {
                try {
                    setUser(JSON.parse(userData)); // Set the logged-in user data
                }
                catch (e) {
                    console.error('Failed to parse user data:', e);
                    localStorage.removeItem('user_data'); // Clean up if parsing fails
                }
            }
            setIsLoading(false);
        }
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (<div className='flex flex-col'>
      {user ? (<>
          <div className='flex flex-row justify-center mx-auto'>
            <Tabs defaultValue='profile'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='profile'>Profile</TabsTrigger>
                <TabsTrigger value='orders'>Order History</TabsTrigger>
              </TabsList>

              <TabsContent value='profile'>
                <UserProfile />
              </TabsContent>

              <TabsContent value='orders'>
                <UserOrderHistory />
              </TabsContent>
            </Tabs>
          </div>
          <div className='flex flex-col justify-center'>
            <div className='w-full sm:w-auto flex justify-center mt-10'>
              <LogOutButton />
            </div>
            <div className='flex justify-center mt-10'>
              <Button variant='outline' className='text-lg font-bold py-3 px-6 w-full sm:w-auto cursor-pointer' onClick={handleBackToHome}>
                Back to Home{' '}
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'>
                  <path fillRule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'/>
                </svg>
              </Button>
            </div>
          </div>
        </>) : (<div>
          <AccountInitialization />
        </div>)}
    </div>);
};
export default Account;

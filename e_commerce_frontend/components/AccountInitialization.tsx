'use client';
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginCard from '@/components/LoginCard'; // Import the LoginCard component
import RegisterCard from '@/components/RegisterCard'; // Import the RegisterCard component
import { Button } from './ui/button';
import { updateAllInfo } from '@/services/customer_api';

const handleBackToHome = async () => {
  if (localStorage.getItem('user_data') != null) {
    const success = await updateAllInfo();
    if (success) {
      // Navigate to the home page if all information updates are successful
      window.location.href = '/';
    } else {
      alert('Failed to update information. Please try again.');
    }
  } else {
    window.location.href = '/';
  }
};

const AccountInitialization = () => {
  return (
    <div className='flex flex-col justify-center min-h-screen px-4'>
      <Tabs defaultValue='login' className='w-full sm:h-[600px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='register'>Register</TabsTrigger>
        </TabsList>

        <TabsContent value='login'>
          <LoginCard />
        </TabsContent>

        <TabsContent value='register'>
          <RegisterCard />
        </TabsContent>
      </Tabs>
      <div className='flex justify-center mt-10'>
        <Button
          variant='outline'
          className='text-lg font-bold py-3 px-6 w-full sm:w-auto cursor-pointer'
          onClick={handleBackToHome}
        >
          Back to Home{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-arrow-right-short'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default AccountInitialization;

'use client';
import { Button } from '@/components/ui/button';
import UserProfile from '@/components/UserProfile';
import { updateAllInfo } from '@/services/customer_api';
import { useRouter } from 'next/navigation';
import React from 'react';

const page = () => {
  const router = useRouter();

  async function handleBackToAdmin(event: MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    await updateAllInfo();

    //logout
    localStorage.removeItem('user_data');
    localStorage.removeItem('address');
    localStorage.removeItem('billing');

    console.log('User logged out');
    router.push('/admin');
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <UserProfile />
      <Button
        variant='outline'
        className='justify-center text-lg font-bold py-3 px-6 max-w-xs cursor-pointer mt-20'
        onClick={handleBackToAdmin}
      >
        Done editing
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
  );
};

export default page;

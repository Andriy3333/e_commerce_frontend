'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingTable } from './cart_table'; // Import the DataTable component
import { shopping_columns } from './cart_columns'; // Import the column definitions
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NavMenu from '@/components/NavMenu';

// Define the type for items in the cart
interface ShoppingCartItem {
  category: string;
  description: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  amountOrdered: number;
}

const Page = () => {
  const [data, setData] = useState<ShoppingCartItem[]>([]);

  useEffect(() => {
    // Fetch shopping cart data from localStorage when component mounts
    const cartData = localStorage.getItem('shopping_cart');
    if (cartData) {
      setData(JSON.parse(cartData)); // Set the data to the state
    }
  }, []); // Run once when the component is mounted

  return (
    <div>
      <NavMenu />
      <h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>
      <ShoppingTable columns={shopping_columns} data={data} />
      <div className='flex justify-center'>
        {data.length > 0 && ( // Render the button only if data array is not empty
          <Link href='/order2'>
            <Button variant='outline' className='text-lg font-bold py-3 px-6 cursor-pointer'>
              Checkout
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
          </Link>
        )}
      </div>
    </div>
  );
};

export default Page;

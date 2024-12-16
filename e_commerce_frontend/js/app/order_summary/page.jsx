'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const OrderSummary = () => {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState('0.00');
    const [date, setDate] = useState('');
    const router = useRouter();
    useEffect(() => {
        const fetchOrderSummary = () => {
            // Retrieve orders and order date from localStorage
            const storedOrders = localStorage.getItem('orders');
            const storedDate = localStorage.getItem('last_order_date');
            const parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
            const calculatedTotal = parsedOrders
                .reduce((total, item) => total + item.price * item.amountOrdered, 0)
                .toFixed(2);
            setItems(parsedOrders);
            setTotal(calculatedTotal);
            setDate(storedDate || new Date().toLocaleDateString());
        };
        fetchOrderSummary();
    }, []);
    return (<div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center'>
        <h2 className='text-2xl font-bold mb-4'>Order Summary</h2>
        <p className='text-lg'>Order Date: {date}</p>
        <p className='text-lg'>Total Price: ${total}</p>
        <ul className='mt-4 space-y-2'>
          {items.map((item, index) => (<li key={index} className='text-sm'>
              {item.name} - ${item.price} x {item.amountOrdered}
            </li>))}
        </ul>
      </div>
      <div className='flex justify-center mt-10'>
        <Button variant='outline' className='text-lg font-bold py-3 px-6 w-full sm:w-auto cursor-pointer' onClick={() => router.push('/')} // Navigate to home
    >
          Back to Home
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'/>
          </svg>
        </Button>
      </div>
    </div>);
};
export default OrderSummary;

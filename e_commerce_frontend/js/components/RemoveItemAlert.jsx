'use client';
import React from 'react';
import { Button } from './ui/button'; // Assuming you're using your Button component
const RemoveItemAlert = () => {
    return (<div className='flex justify-center'>
      {/* Button with icon to remove item */}
      <Button className='flex items-center space-x-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none py-2 px-4 rounded-md'>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth='2'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/>
        </svg>
        <span>Remove Item</span>
      </Button>
    </div>);
};
export default RemoveItemAlert;

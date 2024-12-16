'use client';

import React, { useEffect, useState } from 'react';
import NavMenu from '@/components/NavMenu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TemporaryCheckoutForm from '@/components/TemporaryCheckoutForm';
import { placeOrder } from '@/services/order_api';

const OrderPage = () => {
  const router = useRouter();
  const [isDefaultDialogOpen, setIsDefaultDialogOpen] = useState(false);
  const [isTemporaryDialogOpen, setIsTemporaryDialogOpen] = useState(false);

  const [totalPrice, setTotalPrice] = useState<string | null>(null);
  const [cartIsEmpty, setCartIsEmpty] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleDefaultContinue = async () => {
    if (success) {
      await placeOrder();
      router.push('/order_summary');
    } else {
      setIsDefaultDialogOpen(false);
    }
  };

  const handleDefaultDialogOpen = () => {
    const isSuccess = Math.random() < 0.7; // Simulate success/failure
    setSuccess(isSuccess);
    setIsDefaultDialogOpen(true);
  };

  const handleTemporaryDialogOpen = () => {
    setIsTemporaryDialogOpen(true);
  };

  useEffect(() => {
    const getTotalPrice = () => {
      if (typeof window !== 'undefined') {
        const storedCartItems = localStorage.getItem('shopping_cart');
        if (storedCartItems) {
          const parsedCartItems = JSON.parse(storedCartItems);
          if (parsedCartItems.length === 0) {
            setCartIsEmpty(true);
            return '0.00';
          }
          return parsedCartItems
            .reduce(
              (total: number, item: { price: number; amountOrdered: number }) => total + item.price * item.amountOrdered,
              0
            )
            .toFixed(2);
        }
      }
      setCartIsEmpty(true);
      return '0.00';
    };

    setTotalPrice(getTotalPrice());
  }, []);

  if (cartIsEmpty) {
    return (
      <div className='flex flex-col min-h-screen'>
        <NavMenu />
        <div className='flex justify-center items-center flex-1'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center'>
            <h2 className='text-2xl font-bold mb-4'>Your Cart is Empty</h2>
            <p className='text-lg mb-4'>Add some items to your cart before proceeding to checkout.</p>
            <Button onClick={() => router.push('/catalog')} className='mt-4'>
              Go to Catalog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <NavMenu />
      <div className='flex justify-center items-center flex-1'>
        <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center'>
          <h2 className='text-2xl font-bold mb-4'>Checkout</h2>
          <p className='text-lg mb-4'>Your total is: ${totalPrice !== null ? totalPrice : 'Loading...'}</p>
          <div className='flex flex-col space-y-4'>
            {/* Default Payment Dialog */}
            <Dialog open={isDefaultDialogOpen} onOpenChange={setIsDefaultDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleDefaultDialogOpen}>Pay with Saved Payment Info</Button>
              </DialogTrigger>
              <DialogContent className='text-center'>
                <DialogTitle>{success ? 'Success!' : 'Failed'}</DialogTitle>
                <DialogDescription>
                  {success ? 'Your payment was successful.' : 'Something went wrong with your payment.'}
                </DialogDescription>
                <Button onClick={handleDefaultContinue} className='mt-4'>
                  {success ? 'Continue' : 'Please try again'}
                </Button>
              </DialogContent>
            </Dialog>

            {/* Temporary Payment Dialog */}
            <Dialog open={isTemporaryDialogOpen} onOpenChange={setIsTemporaryDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleTemporaryDialogOpen} variant='outline'>
                  Pay with Temporary Payment Info
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter your Temporary Payment Info</DialogTitle>
                </DialogHeader>
                <TemporaryCheckoutForm />
                <Button
                  onClick={() => {
                    setIsTemporaryDialogOpen(false);
                    setIsDefaultDialogOpen(true);
                  }}
                  className='mt-4'
                >
                  Confirm Temporary Payment
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

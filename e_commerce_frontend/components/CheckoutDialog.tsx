import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import router from 'next/router';
const CheckoutSuccessDialog: React.FC = ({}) => {
  const success = Math.random() < 0.67;
  return (
    <Dialog>
      <DialogContent className='text-center'>
        <DialogTitle>{success ? 'Success!' : 'Failed'}</DialogTitle>
        <DialogDescription>
          {success ? 'Your payment was successful.' : 'Something went wrong with your payment.'}
        </DialogDescription>
        <Button
          onClick={() => {
            if (success) {
              router.push('/order_summary');
            } else {
              router.push('/order2');
            }
          }}
          className='mt-4'
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutSuccessDialog;

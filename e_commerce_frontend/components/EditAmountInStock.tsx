'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { updateItemQuantity } from '@/services/item_api'; // Ensure correct import
import { Item } from '@/app/catalog/columns';

const EditAmountInStock = ({ item, refreshItems }: { item: Item; refreshItems: () => void }) => {
  const [open, setOpen] = useState(false); // Dialog open state
  const [quantity, setQuantity] = useState(item.quantity); // Store current quantity
  const [error, setError] = useState(''); // Error message
  const [loading, setLoading] = useState(false); // Loading state for async actions

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
    setError(''); // Reset error message when typing
  };

  const handleSubmit = async () => {
    if (quantity < 0 || quantity > 1000000) {
      setError('Quantity must be between 0 and 1,000,000.');
      return;
    }

    setLoading(true);
    try {
      await updateItemQuantity(item, quantity); // Call your update method
      refreshItems(); // Refresh items after successful update
      setOpen(false); // Close dialog on success
      console.log('Quantity updated');
      window.location.reload(); // Reload the page to reflect the changes
    } catch (error) {
      console.error('Error updating quantity', error);
      setError('Failed to update quantity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant='outline'>Update Quantity</Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Item Quantity</DialogTitle>
          <DialogDescription>Choose a quantity between 0 and 1,000,000.</DialogDescription>
        </DialogHeader>

        {/* Input for changing the amount in stock */}
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='item-quantity' className='text-right'>
              Quantity
            </Label>
            <Input
              id='item-quantity'
              type='number'
              min={0}
              max={1000000}
              value={quantity}
              onChange={handleQuantityChange}
              className='col-span-3'
            />
          </div>
        </div>

        {/* Error message */}
        {error && <div className='text-red-500 text-sm mb-2'>{error}</div>}

        {/* Dialog Footer with Save/Cancel Buttons */}
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type='button' onClick={handleSubmit} disabled={loading}>
            {loading ? 'Updating...' : 'Update Quantity'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAmountInStock;

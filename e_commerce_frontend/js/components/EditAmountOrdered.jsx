import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useShoppingCart } from '@/services/shopping_cart_api';
const EditAmountOrdered = ({ itemID, quantity }) => {
    const { cart, updateAmountOrdered } = useShoppingCart();
    const [newAmount, setNewAmount] = useState(1); // Default value of 1
    const [open, setOpen] = useState(false); // State to manage dialog open state
    const [error, setError] = useState(''); // State to manage error messages
    const handleSave = () => {
        if (newAmount >= 1 && newAmount <= quantity) {
            // Call the updateAmountOrdered function with itemID and newAmount
            const success = updateAmountOrdered(itemID, newAmount);
            window.location.reload(); // Refresh the page after removal
            if (success) {
                setOpen(false); // Close the dialog if update is successful
            }
            else {
                setError('Failed to update the item amount. Please try again.');
            }
        }
        else {
            setError(`Amount must be between 1 and ${quantity}`);
        }
    };
    return (<Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant='outline'>Edit Quantity</Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Amount Ordered</DialogTitle>
          <DialogDescription>
            Choose a quantity between 1 and {quantity}.
          </DialogDescription>
        </DialogHeader>

        {/* Input for changing the amount ordered */}
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='amountOrdered' className='text-right'>
              Amount Ordered
            </Label>
            <Input id='amountOrdered' type='number' min={1} max={quantity} value={newAmount} onChange={(e) => setNewAmount(Number(e.target.value))} className='col-span-3'/>
          </div>
        </div>

        {/* Error message */}
        {error && <div className='text-red-500 text-sm mb-2'>{error}</div>}

        {/* Dialog Footer with Save/Cancel Buttons */}
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type='button' onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};
export default EditAmountOrdered;

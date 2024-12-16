import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
const ItemDescription = ({ selectedRow, onClose, onAddToCart, }) => {
    if (!selectedRow)
        return null;
    const handleAddToCart = () => {
        onAddToCart(selectedRow); // Add item to cart
        onClose(); // Close the dialog
    };
    return (<Dialog open={!!selectedRow} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
          <DialogDescription>
            <strong>Item:</strong> {selectedRow?.['name']}
            <br />
            <strong>Price:</strong> ${selectedRow?.['price']}
            <br />
            <strong>Description:</strong> {selectedRow?.['description']}
            <br />
            <strong>Category:</strong> {selectedRow?.['category']}
            <br />
            <strong>Brand:</strong> {selectedRow?.['brand']}
            <br />
            <strong>Amount in stock:</strong> {selectedRow?.['quantity']}
            <br />
            <Button onClick={handleAddToCart} className='mt-4'>
              Add to Cart
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>);
};
export default ItemDescription;

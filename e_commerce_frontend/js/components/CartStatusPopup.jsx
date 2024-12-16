import * as React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui/alert-dialog';
const CartStatusPopup = ({ statusMessage, open, onClose, }) => {
    return (<AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className='max-w-sm w-full'>
        <AlertDialogHeader>
          <AlertDialogTitle>{statusMessage}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>);
};
export default CartStatusPopup;

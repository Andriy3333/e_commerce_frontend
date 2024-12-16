import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CartStatusPopupProps {
  statusMessage: string;
  open: boolean;
  onClose: () => void;
}

const CartStatusPopup: React.FC<CartStatusPopupProps> = ({
  statusMessage,
  open,
  onClose,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className='max-w-sm w-full'>
        <AlertDialogHeader>
          <AlertDialogTitle>{statusMessage}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CartStatusPopup;

'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'; // Adjust the path
import { Button } from '@/components/ui/button';

interface EditUserInfoProps {
  label: string; // Label of the field being edited
  value: string; // Current value of the field
  onSave: (newValue: string) => void; // Callback for saving the updated value
}

const EditUserInfo: React.FC<EditUserInfoProps> = ({
  label,
  value,
  onSave,
}) => {
  const [newValue, setNewValue] = useState(value);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {label}</DialogTitle>
        </DialogHeader>
        <div className='mt-4'>
          <label
            htmlFor='edit-input'
            className='block text-sm font-medium text-gray-700'
          >
            {label}
          </label>
          <input
            id='edit-input'
            type='text'
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onSave(newValue)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserInfo;

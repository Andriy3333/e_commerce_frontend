'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react'; // Replace with your icon library if needed
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [billing, setBilling] = useState(null);
    const [editField, setEditField] = useState(null);
    const [fieldValue, setFieldValue] = useState(''); // Track current input value
    const handleEditField = (field, value) => {
        setEditField(field); // Set the field being edited
        setFieldValue(value); // Prepopulate with current value
    };
    const handleSaveField = (field) => {
        // Update the appropriate state based on the field
        if (field.startsWith('user.')) {
            const updatedUser = {
                ...user,
                [field.replace('user.', '')]: fieldValue,
            };
            setUser(updatedUser);
            localStorage.setItem('user_data', JSON.stringify(updatedUser));
        }
        else if (field.startsWith('address.')) {
            const updatedAddress = {
                ...address,
                [field.replace('address.', '')]: fieldValue,
            };
            setAddress(updatedAddress);
            localStorage.setItem('address', JSON.stringify(updatedAddress));
        }
        else if (field.startsWith('billing.')) {
            const updatedBilling = {
                ...billing,
                [field.replace('billing.', '')]: fieldValue,
            };
            setBilling(updatedBilling);
            localStorage.setItem('billing', JSON.stringify(updatedBilling));
        }
        setEditField(null); // Exit edit mode
    };
    useEffect(() => {
        const storedUserData = localStorage.getItem('user_data');
        const storedAddressData = localStorage.getItem('address');
        const storedBillingInfo = localStorage.getItem('billing');
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        }
        if (storedAddressData) {
            setAddress(JSON.parse(storedAddressData));
        }
        if (storedBillingInfo) {
            setBilling(JSON.parse(storedBillingInfo));
        }
    }, []);
    return (<div className='flex flex-col'>
      <div className='flex flex-row justify-center bg-white bg-opacity-75 p-4 rounded-lg mx-auto'>
        {/* User Info Section */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>User Info</h3>
          {[
            {
                label: 'First Name',
                value: user?.firstName || 'n/a',
                field: 'user.firstName',
            },
            {
                label: 'Last Name',
                value: user?.lastName || 'n/a',
                field: 'user.lastName',
            },
            {
                label: 'Username',
                value: user?.username || 'n/a',
                field: 'user.username',
            },
        ].map(({ label, value, field }) => (<div key={field} className='flex justify-between items-center mt-2'>
              {editField === field ? (<div className='flex items-center'>
                  <input type='text' value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} className='border p-1 rounded' autoFocus/>
                  {/* Change Done to Save */}
                  <Button size='sm' className='ml-2' onClick={() => handleSaveField(field)}>
                    Save
                  </Button>
                </div>) : (<p>
                  <strong>{label}:</strong> {value}
                </p>)}
              <Button variant='ghost' size='sm' onClick={() => handleEditField(field, value)}>
                <Pencil className='h-4 w-4'/>
              </Button>
            </div>))}
        </div>

        {/* Address Info Section */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>Address Info</h3>
          {[
            {
                label: 'Country',
                value: address?.country || 'n/a',
                field: 'address.country',
            },
            {
                label: 'Postal Code',
                value: address?.zip || 'n/a',
                field: 'address.zip',
            },
            {
                label: 'Phone Number',
                value: address?.phone || 'n/a',
                field: 'address.phone',
            },
            {
                label: 'Street',
                value: address?.street || 'n/a',
                field: 'address.street',
            },
            {
                label: 'Province',
                value: address?.province || 'n/a',
                field: 'address.province',
            },
        ].map(({ label, value, field }) => (<div key={field} className='flex justify-between items-center mt-2'>
              {editField === field ? (<div className='flex items-center'>
                  <input type='text' value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} className='border p-1 rounded' autoFocus/>
                  {/* Change Done to Save */}
                  <Button size='sm' className='ml-2' onClick={() => handleSaveField(field)}>
                    Save
                  </Button>
                </div>) : (<p>
                  <strong>{label}:</strong> {value}
                </p>)}
              <Button variant='ghost' size='sm' onClick={() => handleEditField(field, value)}>
                <Pencil className='h-4 w-4'/>
              </Button>
            </div>))}
        </div>

        {/* Billing Info Section */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>Billing Info</h3>
          {[
            {
                label: 'Credit Card Number',
                value: billing?.cardNumber || 'n/a',
                field: 'billing.cardNumber',
            },
            {
                label: 'Credit Card Expiration Date',
                value: billing?.expirationDate || 'n/a',
                field: 'billing.expirationDate',
            },
            {
                label: 'Credit Card CVV',
                value: billing?.cvv || 'n/a',
                field: 'billing.cvv',
            },
        ].map(({ label, value, field }) => (<div key={field} className='flex justify-between items-center mt-2'>
              {editField === field ? (<div className='flex items-center'>
                  <input type='text' value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} className='border p-1 rounded' autoFocus/>
                  {/* Change Done to Save */}
                  <Button size='sm' className='ml-2' onClick={() => handleSaveField(field)}>
                    Save
                  </Button>
                </div>) : (<p>
                  <strong>{label}:</strong> {value}
                </p>)}
              <Button variant='ghost' size='sm' onClick={() => handleEditField(field, value)}>
                <Pencil className='h-4 w-4'/>
              </Button>
            </div>))}
        </div>
      </div>
    </div>);
};
export default UserProfile;

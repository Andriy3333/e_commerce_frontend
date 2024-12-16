'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { customerLogin, getCustomerAddress, getCustomerBillingInfo, registerCustomer } from '@/services/customer_api';
// const validatePresence = (value) => value.trim().length > 0;
// const validateLength = (value) => value.trim().length > 5;
// const validatePostalCode = (postalCode) => /^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(postalCode);
// const validatePhone = (phone) => /^\d{3}-\d{3}-\d{4}$/.test(phone);
// const validateCardNumber = (cardNumber) => /^\d{4}(\s?\d{4}){3}$/.test(cardNumber);
// const validateExpirationDate = (expirationDate) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate);
// const validateCVV = (cvv) => /^\d{3}$/.test(cvv);
const RegisterCard = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        country: '',
        zip: '',
        phone: '',
        street: '',
        province: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });
    const [error, setError] = useState(''); // State to store error message (if any)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            await registerCustomer(formData);
            const customerData = await customerLogin(formData.username, formData.password);
            localStorage.setItem('user_data', JSON.stringify(customerData));
            const userData = localStorage.getItem('user_data');
            if (userData != null) {
                const parsedUserData = JSON.parse(userData);
                const addressID = parsedUserData.addressID;
                const id = parsedUserData.id;
                localStorage.setItem('address', JSON.stringify(await getCustomerAddress(addressID)));
                localStorage.setItem('billing', JSON.stringify(await getCustomerBillingInfo(id)));
            }
            console.log('User data saved to localStorage:', formData);
            // Refresh the page after successful registration
            window.location.reload();
        }
        catch (error) {
            console.error('Error saving data to localStorage:', error);
            setError('There was an error saving the data. Please try again.');
        }
    };
    return (<Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='grid grid-cols-3 gap-10'>
          {/* Account Section */}
          <div className='space-y-5'>
            <h3 className='font-semibold'>Account</h3>
            <div className='grid grid-cols-2 gap-5'>
              {/* First Name */}
              <div className='space-y-1'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input id='firstName' name='firstName' value={formData.firstName} onChange={handleInputChange} placeholder='First name'/>
              </div>

              {/* Last Name */}
              <div className='space-y-1'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input id='lastName' name='lastName' value={formData.lastName} onChange={handleInputChange} placeholder='Last name'/>
              </div>

              {/* Username */}
              <div className='space-y-1 col-span-2'>
                <Label htmlFor='username'>Username</Label>
                <Input id='username' name='username' value={formData.username} onChange={handleInputChange} placeholder='Username'/>
              </div>

              {/* Password */}
              <div className='space-y-1 col-span-2'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' name='password' type='password' value={formData.password} onChange={handleInputChange} placeholder='Password'/>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className='space-y-5'>
            <h3 className='font-semibold'>Address</h3>
            <div className='grid grid-cols-2 gap-5'>
              {/* Country */}
              <div className='space-y-1'>
                <Label htmlFor='country'>Country</Label>
                <Input id='country' name='country' value={formData.country} onChange={handleInputChange} placeholder='Country'/>
              </div>

              {/* Province */}
              <div className='space-y-1'>
                <Label htmlFor='province'>Province/State</Label>
                <Input id='province' name='province' value={formData.province} onChange={handleInputChange} placeholder='Province'/>
              </div>

              {/* Street */}
              <div className='space-y-1 col-span-2'>
                <Label htmlFor='street'>Street</Label>
                <Input id='street' name='street' value={formData.street} onChange={handleInputChange} placeholder='Street'/>
              </div>
              {/* Zip */}
              <div className='space-y-1 col-span-2'>
                <Label htmlFor='zip'>Postal Code</Label>
                <Input id='zip' name='zip' value={formData.zip} onChange={handleInputChange} placeholder='Eg : A1A 1A1'/>
              </div>
            </div>
          </div>

          {/* Billing Info Section */}
          <div className='space-y-5'>
            <h3 className='font-semibold'>Billing Info</h3>
            <div className='grid grid-cols-2 gap-5'>
              {/* Card Number */}
              <div className='space-y-1 col-span-2'>
                <Label htmlFor='cardNumber'>Card Number</Label>
                <Input id='cardNumber' name='cardNumber' value={formData.cardNumber} onChange={handleInputChange} placeholder='Card number'/>
              </div>

              {/* Expiration Date */}
              <div className='space-y-1'>
                <Label htmlFor='expirationDate'>Expiration Date</Label>
                <Input id='expirationDate' name='expirationDate' value={formData.expirationDate} onChange={handleInputChange} placeholder='Exp. Date'/>
              </div>

              {/* CVV */}
              <div className='space-y-1'>
                <Label htmlFor='cvv'>CVV</Label>
                <Input id='cvv' name='cvv' value={formData.cvv} onChange={handleInputChange} placeholder='CVV'/>
              </div>
              <div className='space-y-1 col-span-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input id='phone' name='phone' value={formData.phone} onChange={handleInputChange} placeholder='Phone number'/>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button type='submit'>Register</Button>
        </CardFooter>
      </form>
      {error && <div className='text-red-500 mt-4 text-center'>{error}</div>} {/* Error message */}
    </Card>);
};
export default RegisterCard;

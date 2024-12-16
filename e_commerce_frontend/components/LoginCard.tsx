'use client';

import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { customerLogin } from '@/services/customer_api'; // Make sure this is the correct import path

const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For error message
  const [loading, setLoading] = useState(false); // For loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    setLoading(true); // Set loading to true
    setError(''); // Reset any previous errors

    const customer = await customerLogin(username, password); // Call the login API
    setLoading(false); // Set loading to false

    if (customer) {
      // Handle successful login (e.g., redirect or show success message)
      console.log('Login successful', customer);

      // Refresh the page after successful login
      window.location.reload();
    } else {
      // Handle login failure
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div>
      <Card className='max-w-md mx-auto'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          {' '}
          {/* Form to handle submission */}
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='login-username'>Username</Label>
              <Input
                id='login-username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter your username'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='login-password'>Password</Label>
              <Input
                id='login-password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
        {error && <div className='text-red-500 mt-4 text-center'>{error}</div>}{' '}
        {/* Error message */}
      </Card>
    </div>
  );
};

export default LoginCard;

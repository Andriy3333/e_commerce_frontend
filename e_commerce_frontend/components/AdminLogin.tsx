'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link for navigation

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For error message
  const [loading, setLoading] = useState(false); // For loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    setLoading(true); // Set loading to true
    setError(''); // Reset any previous errors

    // Admin login logic (both username and password are 'admin')
    if (username === 'admin' && password === 'admin') {
      setLoading(false);
      console.log('Login successful');
      // Set the is_admin flag in localStorage
      localStorage.setItem('is_admin', 'true');
      // Redirect or handle successful login
      window.location.href = '/admin'; // Redirect to admin dashboard or other page
    } else {
      setLoading(false);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen py-6'>
      <Card className='max-w-sm w-full p-4'>
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Sign in to your admin account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='login-username'>Username</Label>
              <Input
                id='login-username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter username'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='login-password'>Password</Label>
              <Input
                id='login-password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password'
              />
            </div>
          </CardContent>
          <CardFooter className='flex justify-between gap-4'>
            <Button type='submit' disabled={loading} className='w-1/2'>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Link href='/' className='w-1/2'>
              <Button variant='outline' className='w-full'>
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </form>
        {error && <div className='text-red-500 mt-4 text-center'>{error}</div>}{' '}
        {/* Error message */}
      </Card>
    </div>
  );
};

export default AdminLogin;

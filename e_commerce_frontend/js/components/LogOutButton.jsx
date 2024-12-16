import React, { useState, useEffect } from 'react';
import { Button } from './ui/button'; // Assuming you have a Button component from ShadCN
import { updateAllInfo } from '@/services/customer_api';
const LogOutButton = () => {
    const [isClient, setIsClient] = useState(false);
    // Ensuring that useRouter only runs on the client-side
    useEffect(() => {
        setIsClient(true); // Set to true after the component is mounted on the client-side
    }, []);
    if (!isClient) {
        return null; // Return null during server-side rendering
    }
    const handleLogout = async () => {
        // Clear user data from localStorage
        await updateAllInfo();
        localStorage.removeItem('user_data');
        localStorage.removeItem('address');
        localStorage.removeItem('billing');
        console.log('User logged out');
        // Reload the page to refresh
        window.location.reload();
    };
    return (<Button onClick={handleLogout} variant='outline' color='danger' className='bg-black text-white max-w-xs w-full'>
      Log Out
    </Button>);
};
export default LogOutButton;

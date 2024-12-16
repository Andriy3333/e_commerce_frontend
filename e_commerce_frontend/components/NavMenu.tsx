'use client';
import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Button } from './ui/button';

const NavMenu = () => {
  return (
    <div className='flex justify-center w-full'>
      <NavigationMenu>
        <NavigationMenuList className='flex space-x-6'>
          {/* Home Button */}
          <NavigationMenuItem>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* View Catalog Link */}
          <NavigationMenuItem>
            <Link href='/catalog' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                View Catalog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* Conditionally render User Login, Register, and Admin Login if loggedIn is false */}
          {/* Account Page */}
          <NavigationMenuItem>
            <Link href='/account' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Account
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* Conditionally render "View Cart" if cartExists is true */}
          <NavigationMenuItem>
            <Link href='/cart' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                View Cart
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='21'
                  height='21'
                  fill='currentColor'
                  className='bi bi-cart2 ml-2'
                  viewBox='0 0 16 16'
                >
                  <path d='M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0' />
                </svg>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <>
            {/* Admin Login */}
            <NavigationMenuItem>
              <Link href='/admin' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Admin Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;

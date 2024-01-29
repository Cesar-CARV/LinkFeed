'use client'
import { SessionProvider } from 'next-auth/react';
import { UserDataProvider } from '@/context/userContext';

function Layout({children}) {
  return ( 
    <>
      <SessionProvider>
        <UserDataProvider>
          {children}
        </UserDataProvider>
      </SessionProvider>
    </>
  );
}

export default Layout;
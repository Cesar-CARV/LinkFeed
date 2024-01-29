'use client'
import { SessionProvider } from 'next-auth/react';

function Layout({children}) {
  return ( 
    <>
      <SessionProvider>
        {children}
      </SessionProvider>
    </>
  );
}

export default Layout;
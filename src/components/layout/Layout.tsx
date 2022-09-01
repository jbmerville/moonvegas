import * as React from 'react';

import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <Header />
      {children}
      <div className='layout z-50 flex items-center justify-between '>
        <div className='mb:text flex w-full items-center justify-center pt-2 pb-6 text-center text-xs text-white/50'>
          Moonbeam Raffle is not available in Excluded Jurisdictions. By
          accessing and using the interface you agree with our Terms &
          Conditions.
        </div>
      </div>
    </>
  );
}

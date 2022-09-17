import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/layout/Header';
import UnderlineLink from '@/components/links/UnderlineLink';

import { currentNetwork, currentRaffleAddress } from '@/config';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <Header />
      {children}
      <ToastContainer
        position='bottom-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='layout z-50 flex flex-col items-center justify-center pt-2 pb-6'>
        <div className='mb:text flex w-full items-center justify-center  text-center text-xs text-white/50'>
          MoonVegas is not available in Excluded Jurisdictions. By accessing and using the interface
          you agree with our Terms & Conditions.
        </div>
        <p className='text-center text-xs text-white/50'>
          View Raffle Smart Contract in explorer:{' '}
          <UnderlineLink href={currentNetwork.getExplorerAddressLink(currentRaffleAddress)}>
            {currentRaffleAddress}
          </UnderlineLink>
        </p>
      </div>
    </>
  );
}

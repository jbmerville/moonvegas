import { useEthers } from '@usedapp/core';
import React from 'react';

import { isAccountAdmin } from '@/lib/helpers';

import Footer from '@/components/layouts/Footer';
import EmptyCoinFlip from '@/components/pages/admin/EmptyCoinFlip';
import EndRaffleSection from '@/components/pages/admin/EndRaffleSection';
import Seo from '@/components/Seo';

import { CoinFlipProvider } from '@/contexts/CoinFlipContext';
import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';
import { RaffleProvider } from '@/contexts/RaffleContext';

const Admin = () => {
  const { account } = useEthers();
  const { colorAccent } = useCurrentNetworkContext();

  if (!isAccountAdmin(account)) {
    return <></>;
  }
  return (
    <>
      <Seo templateTitle='Admin' />
      <main className='h-full w-full overflow-y-auto '>
        <section className='h-fit pt-36 md:pt-10'>
          <div className='flex min-w-full grow flex-row justify-between'>
            <div className='layout flex flex-col items-start justify-between'>
              <div className='mb-1 flex w-full flex-col items-start justify-start '>
                <p className={`text-${colorAccent} text-3xl font-bold md:text-5xl`}>Admin</p>
                <p className={`text-${colorAccent} text-sm font-light opacity-80 md:text-lg`}>
                  Interact with smart contracts
                </p>
              </div>
              <RaffleProvider>
                <p className='my-3 mt-5 text-2xl font-bold text-white  md:text-3xl'>Raffle</p>
                <div className={`border-${colorAccent} rounded-3xl border-2 p-4 md:p-6`}>
                  <EndRaffleSection />
                </div>
              </RaffleProvider>
              <p className='my-3 mt-10 text-2xl font-bold text-white md:mt-12 md:text-3xl'>Coin Flip</p>
              <CoinFlipProvider>
                <div className={`border-${colorAccent}  rounded-3xl border-2 p-4 md:mb-12 md:p-6`}>
                  <EmptyCoinFlip />
                </div>
              </CoinFlipProvider>
            </div>
          </div>
        </section>
        <Footer className='mt-10 bg-moonbeam-grey-dark' />
      </main>
    </>
  );
};

export default Admin;

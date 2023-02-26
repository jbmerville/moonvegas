import React from 'react';

import AdminBanner from '@/components/pages/admin/AdminBanner';
import EndRaffleSection from '@/components/pages/admin/AdminRaffle/EndRaffle';
import SetRoyaltyRaffle from '@/components/pages/admin/AdminRaffle/SetRoyaltyRaffle';

import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';
import { useRaffleContext } from '@/contexts/RaffleContext';

const AdminRaffle = () => {
  const { colorAccent, currentNetwork } = useCurrentNetworkContext();
  const { raffleState } = useRaffleContext();

  return (
    <div className={`border-${colorAccent} rounded-3xl border-2 p-4 md:mb-12 md:p-6`}>
      <AdminBanner address={currentNetwork.coinFlipAddress} owner={raffleState.owner} />
      <div className='mb-14'>
        <EndRaffleSection />
      </div>
      <div className='mt-14'>
        <SetRoyaltyRaffle />
      </div>
      {/* <div className='mt-14'><SetMaxPoolBetRatio /></div> */}
    </div>
  );
};

export default AdminRaffle;

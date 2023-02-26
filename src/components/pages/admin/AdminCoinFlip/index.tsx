import React from 'react';

import AdminBanner from '@/components/pages/admin/AdminBanner';
import EmptyCoinFlip from '@/components/pages/admin/AdminCoinFlip/EmptyCoinFlip';
import SetMaxPoolBetRatio from '@/components/pages/admin/AdminCoinFlip/SetMaxPoolBetRatio';
import SetRoyaltyCoinFlip from '@/components/pages/admin/AdminCoinFlip/SetRoyaltyCoinFlip';

import { useCoinFlipContext } from '@/contexts/CoinFlipContext';
import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

const AdminCoinFlip = () => {
  const { colorAccent, currentNetwork } = useCurrentNetworkContext();
  const { coinFlipState } = useCoinFlipContext();

  return (
    <div className={`border-${colorAccent} rounded-3xl border-2 p-4 md:mb-12 md:p-6`}>
      <AdminBanner address={currentNetwork.coinFlipAddress} owner={coinFlipState.owner} />
      <div className='mb-14'>
        <EmptyCoinFlip />
      </div>
      <div className='my-14'>
        <SetRoyaltyCoinFlip />
      </div>
      <div className='mt-14'>
        <SetMaxPoolBetRatio />
      </div>
    </div>
  );
};

export default AdminCoinFlip;

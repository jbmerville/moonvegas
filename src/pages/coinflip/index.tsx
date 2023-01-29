import React, { useState } from 'react';

import Footer from '@/components/layouts/Footer';
import BetAmountSelection from '@/components/pages/coinflip/BetAmountSelection';
import CoinFaceSelection from '@/components/pages/coinflip/CoinFaceSelection';
import CoinFlipInfoCards from '@/components/pages/coinflip/CoinFlipInfoCards';
import CoinFlipLastSalesTable from '@/components/pages/coinflip/CoinFlipLastSalesTable';
import Seo from '@/components/Seo';

import { CoinFlipProvider } from '@/contexts/CoinFlipContext';

import { CoinFace } from '@/types';

export default function CoinFlip() {
  const [playerCoinFaceChoice, setPlayerCoinFaceChoice] = useState<CoinFace | undefined>();

  return (
    <>
      <Seo templateTitle='CoinFlip' />
      <main className='h-full w-full overflow-y-auto '>
        <section className='h-fit pt-36 md:pt-10'>
          <CoinFlipProvider>
            <CoinFlipInfoCards />
            <CoinFaceSelection
              playerCoinFaceChoice={playerCoinFaceChoice}
              setPlayerCoinFaceChoice={setPlayerCoinFaceChoice}
            />
            <div className='layout flex flex-col items-center justify-center'>
              <BetAmountSelection playerCoinFaceChoice={playerCoinFaceChoice} />
            </div>
            <div className='mt-10 flex min-w-full grow flex-col justify-between rounded-t-3xl bg-moonbeam-grey text-white'>
              <CoinFlipLastSalesTable />
            </div>
          </CoinFlipProvider>
          <Footer />
        </section>
      </main>
    </>
  );
}

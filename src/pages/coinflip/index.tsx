import React, { useState } from 'react';

import Footer from '@/components/layouts/Footer';
import CoinFlipBetAmountSelection from '@/components/pages/coinflip/CoinFlipBetAmountSelection';
import CoinFlipFaceSelection from '@/components/pages/coinflip/CoinFlipFaceSelection';
import CoinFlipInfoCards from '@/components/pages/coinflip/CoinFlipInfoCards';
import CoinFlipLastSalesTable from '@/components/pages/coinflip/CoinFlipLastSalesTable';
import CoinFlipTransactionResult from '@/components/pages/coinflip/CoinFlipTransactionResult';
import Seo from '@/components/Seo';

import { CoinFlipProvider } from '@/contexts/CoinFlipContext';

import { CoinFace } from '@/types';

export default function CoinFlip() {
  const [playerCoinFaceChoice, setPlayerCoinFaceChoice] = useState<CoinFace>(CoinFace.HEADS);

  return (
    <>
      <Seo templateTitle='CoinFlip' />
      <main className='h-full w-full overflow-y-auto '>
        <section className='h-fit pt-36 md:pt-10'>
          <CoinFlipProvider>
            <CoinFlipTransactionResult />
            <CoinFlipInfoCards />
            <CoinFlipFaceSelection
              playerCoinFaceChoice={playerCoinFaceChoice}
              setPlayerCoinFaceChoice={setPlayerCoinFaceChoice}
            />
            <CoinFlipBetAmountSelection playerCoinFaceChoice={playerCoinFaceChoice} />
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

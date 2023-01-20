import Image from 'next/image';
import React, { useState } from 'react';

import useCoinFlip from '@/hooks/useCoinFlip';

import Button from '@/components/buttons/Button';

import ChoicesSection from '@/pages/coinflip/coinflip/ChoicesSection';
import CoinFlipInfoCardsSection from '@/pages/coinflip/coinflip/CoinFlipInfoCardsSection';

import coinHeads from '../../../../public/images/coin-heads.png';
import coinTails from '../../../../public/images/coin-tails.png';

import { CoinFace } from '@/types';

const CoinSection = () => {
  const [playerCoinFaceChoice, setPlayerCoinFaceChoice] = useState<CoinFace | undefined>();
  const {
    outcome,
    flip,
    isTransactionPending,
    totalFlips,
    totalVolume,
    resetOutcome,
    contractBalance,
  } = useCoinFlip();

  return (
    <>
      <CoinFlipInfoCardsSection totalFlips={totalFlips} totalVolume={totalVolume} />
      {outcome ? (
        <div className='layout my-16 flex flex-col items-center justify-center'>
          {outcome.draw === CoinFace.HEADS ? (
            <Image src={coinHeads} layout='fixed' height='120px' width='120px' alt='' />
          ) : (
            <Image src={coinTails} layout='fixed' height='120px' width='120px' alt='' />
          )}
          {outcome.isWin ? (
            <div className='mt-5 text-2xl text-green-400'>You Won</div>
          ) : (
            <div className='mt-5 text-2xl text-red-500'>You Lost</div>
          )}
          <Button
            onClick={resetOutcome}
            variant='outline'
            className='text mt-5 capitalize  hover:bg-moonbeam-cyan/40'
          >
            Try your luck again?
          </Button>
        </div>
      ) : (
        <div className='layout flex flex-col items-center justify-center'>
          {/* Desktop */}
          <div className='my-16 hidden flex-row items-center justify-center md:flex'>
            <div
              className={`flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3 transition ${
                playerCoinFaceChoice === CoinFace.HEADS ? 'scale-125 ' : ''
              }`}
              onClick={() => setPlayerCoinFaceChoice(CoinFace.HEADS)}
            >
              <Image src={coinHeads} layout='fixed' height='120px' width='120px' alt='' />
              <p className='mt-3 font-extrabold uppercase text-white'> HEADS</p>
            </div>
            <div
              className={`ml-20 flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3 transition ${
                playerCoinFaceChoice === CoinFace.TAILS ? 'scale-125 ' : ''
              }`}
              onClick={() => setPlayerCoinFaceChoice(CoinFace.TAILS)}
            >
              <Image src={coinTails} layout='fixed' height='120px' width='120px' alt='' />
              <p className='mt-3 font-extrabold	uppercase text-white'>TAILS</p>
            </div>
          </div>

          {/* Mobile */}
          <div className='my-16 flex flex-row items-center justify-center md:hidden'>
            <div
              className={`flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3  transition ${
                playerCoinFaceChoice === CoinFace.HEADS ? 'scale-125 ' : ''
              }`}
              onClick={() => setPlayerCoinFaceChoice(CoinFace.HEADS)}
            >
              <Image src={coinHeads} layout='fixed' height='100px' width='100px' alt='' />

              <p className='mt-3 font-extrabold uppercase text-white'> HEADS</p>
            </div>
            <div
              className={`ml-10 flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3 transition ${
                playerCoinFaceChoice === CoinFace.TAILS ? 'scale-125 ' : ''
              }`}
              onClick={() => setPlayerCoinFaceChoice(CoinFace.TAILS)}
            >
              <Image src={coinTails} layout='fixed' height='100px' width='100px' alt='' />
              <p className='mt-3 font-extrabold	uppercase text-white'>TAILS</p>
            </div>
          </div>
        </div>
      )}
      <div className='layout flex flex-col items-center justify-center'>
        <ChoicesSection
          contractBalance={contractBalance}
          flip={flip}
          isTransactionPending={isTransactionPending}
          playerCoinFaceChoice={playerCoinFaceChoice}
        />
      </div>
    </>
  );
};

export default CoinSection;

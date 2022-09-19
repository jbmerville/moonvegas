import Image from 'next/image';
import React, { useState } from 'react';

import ChoicesSection from '@/components/coinflip/ChoicesSection';
import CoinFlipInfoCardsSection from '@/components/coinflip/CoinFlipInfoCardsSection';

import coin from '../../../public/images/coin.png';
import coinSelected from '../../../public/images/coin-selected.png';

export enum CoinFace {
  HEAD = 'HEAD',
  TAIL = 'TEAD',
}

const CoinSection = () => {
  const [playerCoinFaceChoice, setPlayerCoinFaceChoice] = useState<CoinFace | undefined>();

  return (
    <>
      <CoinFlipInfoCardsSection />
      <div className='layout flex flex-col items-center justify-center'>
        {/* Desktop */}
        <div className='my-16 hidden flex-row items-center justify-center md:flex'>
          <div
            className={`flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3 ${
              playerCoinFaceChoice === CoinFace.HEAD ? 'scale-125	' : ''
            }`}
            onClick={() => setPlayerCoinFaceChoice(CoinFace.HEAD)}
          >
            {playerCoinFaceChoice === CoinFace.HEAD ? (
              <Image src={coinSelected} layout='fixed' height='120px' width='120px' alt='' />
            ) : (
              <Image src={coin} layout='fixed' height='120px' width='120px' alt='' />
            )}

            <p className='mt-3 font-extrabold uppercase text-white'>Head</p>
          </div>
          <div
            className={`ml-10 flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3 transition ${
              playerCoinFaceChoice === CoinFace.TAIL ? 'scale-125	' : ''
            }`}
            onClick={() => setPlayerCoinFaceChoice(CoinFace.TAIL)}
          >
            {playerCoinFaceChoice === CoinFace.TAIL ? (
              <Image src={coinSelected} layout='fixed' height='120px' width='120px' alt='' />
            ) : (
              <Image src={coin} layout='fixed' height='120px' width='120px' alt='' />
            )}{' '}
            <p className='mt-3 font-extrabold	uppercase text-white'>Tail</p>
          </div>
        </div>

        {/* Mobile */}
        <div className='my-16 flex flex-row items-center justify-center md:hidden'>
          <div
            className={`flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3 ${
              playerCoinFaceChoice === CoinFace.HEAD ? 'scale-125	' : ''
            }`}
            onClick={() => setPlayerCoinFaceChoice(CoinFace.HEAD)}
          >
            {playerCoinFaceChoice === CoinFace.HEAD ? (
              <Image src={coinSelected} layout='fixed' height='100px' width='100px' alt='' />
            ) : (
              <Image src={coin} layout='fixed' height='100px' width='100px' alt='' />
            )}

            <p className='mt-3 font-extrabold uppercase text-white'>Head</p>
          </div>
          <div
            className={`ml-10 flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3 transition ${
              playerCoinFaceChoice === CoinFace.TAIL ? 'scale-125	' : ''
            }`}
            onClick={() => setPlayerCoinFaceChoice(CoinFace.TAIL)}
          >
            {playerCoinFaceChoice === CoinFace.TAIL ? (
              <Image src={coinSelected} layout='fixed' height='100px' width='100px' alt='' />
            ) : (
              <Image src={coin} layout='fixed' height='100px' width='100px' alt='' />
            )}{' '}
            <p className='mt-3 font-extrabold	uppercase text-white'>Tail</p>
          </div>
        </div>
      </div>
      <div className='layout flex flex-col items-center justify-center'>
        <ChoicesSection />
      </div>
    </>
  );
};

export default CoinSection;

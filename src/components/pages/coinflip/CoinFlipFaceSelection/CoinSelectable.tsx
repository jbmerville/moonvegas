import React from 'react';

import CoinImage from '@/components/pages/coinflip/CoinFlipFaceSelection/CoinImage';

import { CoinFace } from '@/types';

interface CoinPropsType {
  coinFace: CoinFace;
  setPlayerCoinFaceChoice: (playerCoinFaceChoice: CoinFace) => void;
  playerCoinFaceChoice: CoinFace;
}

// Animation taken from CodePen: https://codepen.io/bill0x2A/pen/LYbqZJj
const Coin = (props: CoinPropsType) => {
  const { coinFace, playerCoinFaceChoice, setPlayerCoinFaceChoice } = props;
  const isCoinFaceSelectedByPlayer = coinFace === playerCoinFaceChoice;
  const coinFaceText = coinFace === CoinFace.HEADS ? 'Heads' : 'Tails';

  const nonSelectedFace = (
    <>
      <div
        className='relative flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center rounded-[100%] transition duration-500 md:h-[150px] md:w-[150px]'
        onClick={() => setPlayerCoinFaceChoice(coinFace)}
      >
        <CoinImage coinFace={coinFace} />
      </div>
      {/* <p className='mt-6 font-extrabold uppercase text-white'>Pick {coinFaceText}</p> */}
    </>
  );

  const selectedFace = (
    <div className='flex flex-col items-center justify-center '>
      <div className='animated-coin relative flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center rounded-full transition duration-500 md:h-[150px] md:w-[150px]'>
        <div className='relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[100%]'>
          <CoinImage coinFace={coinFace} shimmer />
          {/* <div className='animated-coin-shine absolute top-0 left-0 h-[10px] w-[200px] rotate-[25deg] bg-white/25  md:h-[30px] md:w-[200px]' /> */}
        </div>
        <div className='animated-coin-flash absolute right-[10px] top-[20px] h-[5px] w-[5px] bg-white md:h-[10px] md:w-[10px]' />
      </div>
      <div className='animated-coin-shadow mt-3 h-[10px] w-[60px] rounded-[100%] bg-white/5 md:mt-10 md:h-[25px] md:w-[100px]'></div>
    </div>
  );

  return (
    <div className='relative mx-8 flex h-[140px] flex-col items-center justify-center md:mx-20 md:mb-10 md:h-[200px]'>
      {isCoinFaceSelectedByPlayer ? selectedFace : nonSelectedFace}
    </div>
  );
};

export default Coin;

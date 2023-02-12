import Image from 'next/image';
import React from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import coinHeads from '../../../../../public/images/coin-heads.png';
import coinTails from '../../../../../public/images/coin-tails.png';

import { CoinFace } from '@/types';

interface CoinPropsType {
  coinFace: CoinFace;
  setPlayerCoinFaceChoice: (playerCoinFaceChoice: CoinFace) => void;
  playerCoinFaceChoice: CoinFace;
}

// Animation taken from CodePen: https://codepen.io/bill0x2A/pen/LYbqZJj
const Coin = (props: CoinPropsType) => {
  const { coinFace, playerCoinFaceChoice, setPlayerCoinFaceChoice } = props;
  const isMobile = useIsMobile();
  const isCoinFaceSelectedByPlayer = coinFace === playerCoinFaceChoice;
  const imageSize = isMobile ? '80px' : '150px';
  const imageSrc = coinFace === CoinFace.HEADS ? coinHeads : coinTails;
  const coinFaceText = coinFace === CoinFace.HEADS ? 'Heads' : 'Tails';

  if (!isCoinFaceSelectedByPlayer) {
    return (
      <div className='relative mx-8 flex flex-col items-center justify-center md:mx-20'>
        <div
          className='relative flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center rounded-[100%] transition duration-500 md:h-[150px] md:w-[150px]'
          onClick={() => setPlayerCoinFaceChoice(coinFace)}
        >
          <Image src={imageSrc} layout='fixed' height={imageSize} width={imageSize} alt={coinFaceText} />
        </div>
        <p className='mt-3 font-extrabold uppercase text-white'>Pick {coinFaceText}</p>
      </div>
    );
  }

  return (
    <div className='mx-8 mb-[-15px] flex flex-col items-center justify-center md:mx-20 md:mb-[-45px]'>
      <div className='animated-coin relative flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center rounded-full transition duration-500 md:h-[150px] md:w-[150px]'>
        <div className='relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[100%]'>
          <Image src={imageSrc} layout='fixed' height={imageSize} width={imageSize} alt={coinFaceText} />
          <div className='animated-coin-shine absolute top-0 left-0 h-[10px] w-[200px] rotate-[25deg] bg-white/25  md:h-[30px] md:w-[200px]' />
        </div>
        <div className='animated-coin-flash absolute right-[10px] top-[20px] h-[5px] w-[5px] bg-white md:h-[10px] md:w-[10px]' />
      </div>
      <div className='animated-coin-shadow mt-3 h-[10px] w-[60px] rounded-[100%] bg-white/5 md:mt-10 md:h-[25px] md:w-[120px]'></div>
    </div>
  );
};

export default Coin;

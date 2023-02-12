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

const Coin = (props: CoinPropsType) => {
  const { coinFace, playerCoinFaceChoice, setPlayerCoinFaceChoice } = props;
  const isMobile = useIsMobile();
  const isCoinFaceSelectedByPlayer = coinFace === playerCoinFaceChoice;
  const imageSize = isMobile ? '80px' : '150px';
  const imageSrc = coinFace === CoinFace.HEADS ? coinHeads : coinTails;
  const coinFaceText = playerCoinFaceChoice === CoinFace.HEADS ? 'Heads' : 'Tails';

  return (
    <div
      className={`mx-5 flex flex-col items-center justify-center md:mx-20 ${
        isCoinFaceSelectedByPlayer && 'mb-[-45px]'
      }`}
    >
      <div
        className={`relative flex h-[150px] w-[150px] cursor-pointer flex-col items-center justify-center transition duration-500 ${
          isCoinFaceSelectedByPlayer ? 'animated-coin' : ''
        } overflow-hidden rounded-[100%]`}
        onClick={() => setPlayerCoinFaceChoice(coinFace)}
      >
        <Image src={imageSrc} layout='fixed' height={imageSize} width={imageSize} alt={coinFaceText} />
        {isCoinFaceSelectedByPlayer && (
          <div className='animated-coin-shine absolute top-0 left-0 h-[10px] w-[100px] rotate-12 bg-white/25 mix-blend-screen md:h-[30px] md:w-[200px]	' />
        )}
      </div>
      {isCoinFaceSelectedByPlayer ? (
        <div className='animated-coin-shadow mt-3 h-[10px] w-[60px] rounded-[100%] bg-white/5 md:mt-10 md:h-[25px] md:w-[120px]'></div>
      ) : (
        <p className='mt-3 font-extrabold uppercase text-white'>{coinFaceText}</p>
      )}
    </div>
  );
};

export default Coin;

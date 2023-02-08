import Image from 'next/image';
import React from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import coinHeads from '../../../../public/images/coin-heads.png';
import coinTails from '../../../../public/images/coin-tails.png';

import { CoinFace } from '@/types';

interface CoinFlipFaceSelectionPropsType {
  playerCoinFaceChoice?: CoinFace;
  setPlayerCoinFaceChoice: (playerCoinFaceChoice?: CoinFace) => void;
}
const CoinFlipFaceSelection = (props: CoinFlipFaceSelectionPropsType) => {
  const { playerCoinFaceChoice, setPlayerCoinFaceChoice } = props;
  const isMobile = useIsMobile();
  const imageSize = isMobile ? '80px' : '150px';

  return (
    <div className='layout flex flex-col items-center justify-center'>
      <div className='my-10 flex flex-row items-center justify-center md:my-16'>
        <div
          className={`flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3 transition ${
            playerCoinFaceChoice === CoinFace.HEADS ? 'scale-125 ' : ''
          }`}
          onClick={() => setPlayerCoinFaceChoice(CoinFace.HEADS)}
        >
          <Image src={coinHeads} layout='fixed' height={imageSize} width={imageSize} alt='' />
          <p className='mt-3 font-extrabold uppercase text-white'> HEADS</p>
        </div>
        <div
          className={`ml-20 flex cursor-pointer flex-col items-center justify-center rounded px-4 py-3 transition ${
            playerCoinFaceChoice === CoinFace.TAILS ? 'scale-125 ' : ''
          }`}
          onClick={() => setPlayerCoinFaceChoice(CoinFace.TAILS)}
        >
          <Image src={coinTails} layout='fixed' height={imageSize} width={imageSize} alt='' />
          <p className='mt-3 font-extrabold	uppercase text-white'>TAILS</p>
        </div>
      </div>
    </div>
  );
};

export default CoinFlipFaceSelection;

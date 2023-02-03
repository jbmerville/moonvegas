import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import UnderlineLink from '@/components/links/UnderlineLink';
import PopUp from '@/components/Popup';

import { currentNetwork } from '@/config';
import CoinFlipContext from '@/contexts/CoinFlipContext';

import coinHeads from '../../../../public/images/coin-heads.png';
import coinTails from '../../../../public/images/coin-tails.png';

import { CoinFace } from '@/types';

const CoinFlipTransactionResult = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const { lastCoinFlipResult } = useContext(CoinFlipContext);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsPopUpOpen(true);
  }, [lastCoinFlipResult?.transactionHash]);

  if (!lastCoinFlipResult) {
    return <></>;
  }

  const coinFaceSize = isMobile ? '80px' : '150px';

  const isWin = lastCoinFlipResult.draw === lastCoinFlipResult.playerChoice;

  return (
    <PopUp isVisible={isPopUpOpen} setIsVisible={setIsPopUpOpen}>
      <div className='m-3 flex flex-col items-center justify-center md:m-5 '>
        <div className={`flex w-full justify-center text-xl md:text-3xl ${isWin ? 'text-green-400' : 'text-red-500'}`}>
          {isWin ? 'You Doubled' : 'You Got Rugged'}
        </div>
        <div className='mt-8 flex items-center justify-around md:w-[400px]'>
          <div className='flex flex-col items-center justify-center'>
            {lastCoinFlipResult.playerChoice === CoinFace.HEADS ? (
              <Image src={coinHeads} layout='fixed' height={coinFaceSize} width={coinFaceSize} alt='' />
            ) : (
              <Image src={coinTails} layout='fixed' height={coinFaceSize} width={coinFaceSize} alt='' />
            )}
            <div className='mt-4'>Your Choice</div>
          </div>
          <div className='flex flex-col items-center justify-center pl-8 md:pl-0'>
            {lastCoinFlipResult.draw === CoinFace.HEADS ? (
              <Image src={coinHeads} layout='fixed' height={coinFaceSize} width={coinFaceSize} alt='' />
            ) : (
              <Image src={coinTails} layout='fixed' height={coinFaceSize} width={coinFaceSize} alt='' />
            )}
            <div className='mt-4'>Flip Result</div>
          </div>
        </div>
        <UnderlineLink
          href={currentNetwork.getExplorerTransactionLink(lastCoinFlipResult.transactionHash)}
          className='pt-8 text-xs text-white/50'
        >
          View Transaction In Explorer
        </UnderlineLink>
      </div>
    </PopUp>
  );
};

export default CoinFlipTransactionResult;

import Image from 'next/image';
import React from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import coinHeads from '../../../../../public/images/coin-heads.png';
import coinTails from '../../../../../public/images/coin-tails.png';

const CoinFlipping = () => {
  const isMobile = useIsMobile();
  const imageSize = isMobile ? '80px' : '150px';

  return (
    <div className='mx-8 mb-[-15px] flex flex-col items-center justify-center md:mx-20 md:mb-[-45px]'>
      <div className='animated-coin relative flex h-[80px] w-[80px] flex-col items-center justify-center rounded-full md:h-[150px] md:w-[150px]'>
        <div className='animated-coin-heads absolute flex h-[80px] w-[80px] flex-col items-center justify-center rounded-full backface-hidden md:h-[150px] md:w-[150px]'>
          <Image src={coinTails} layout='fixed' height={imageSize} width={imageSize} alt='Heads' />
        </div>
        <div className='animated-coin-tails absolute flex h-[80px] w-[80px] flex-col items-center justify-center rounded-full backface-hidden md:h-[150px] md:w-[150px]'>
          <Image src={coinHeads} layout='fixed' height={imageSize} width={imageSize} alt='Tails' />
        </div>
      </div>
      <div className='animated-coin-shadow mt-3 h-[10px] w-[60px] rounded-[100%] bg-white/5 md:mt-10 md:h-[25px] md:w-[120px]'></div>
    </div>
  );
};

export default CoinFlipping;

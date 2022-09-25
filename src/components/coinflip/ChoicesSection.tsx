import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import UnderlineLink from '@/components/links/UnderlineLink';

import { currentNetwork } from '@/config';

import { BetAmount, CoinFace } from '@/types';

interface ChoicesSectionProps {
  playerCoinFaceChoice?: CoinFace;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flip: (choice: CoinFace, betAmount: BetAmount, options?: any) => void;
  isTransactionPending: boolean;
  contractBalance: number;
}

const ChoicesSection = (props: ChoicesSectionProps) => {
  const { flip, playerCoinFaceChoice, contractBalance } = props;
  const [playerBetAmount, setPlayerBetAmount] = useState<BetAmount | undefined>();

  const onFlipClick = () => {
    if (!playerCoinFaceChoice) {
      toast.warn('Please select either heads or tails');
    } else if (!playerBetAmount) {
      toast.warn('Please select bet amount');
    } else {
      flip(playerCoinFaceChoice, playerBetAmount);
    }
  };
  return (
    <>
      <div className='mb-1 flex w-full items-center md:mb-3'>
        <p className='mr-2 w-5 text-xs text-moonbeam-cyan md:mr-3 md:w-7'>
          <FontAwesomeIcon icon={faCoins} size='xs' />
        </p>
        <p className=' text-center text-xl uppercase text-moonbeam-cyan md:text-xl'>Choices</p>
      </div>
      <div className='flex w-full flex-col items-center rounded border border-moonbeam-cyan bg-moonbeam-blue-dark p-2 md:p-5'>
        <div className='grid w-full grid-cols-2 grid-rows-4 gap-2.5 md:grid-cols-4 md:grid-rows-2	'>
          {Object.entries(BetAmount)
            .filter((v) => !isNaN(Number(v[0])))
            .map((entry) => {
              const isDisabled = parseInt(entry[0]) >= contractBalance / 4;
              const isSelected = playerBetAmount === entry[1];
              return (
                <button
                  key={entry[0]}
                  disabled={isDisabled}
                  onClick={() => setPlayerBetAmount(entry[1] as BetAmount)}
                  className={`${
                    isSelected
                      ? 'from-purple-600 to-blue-500 ring-blue-800'
                      : 'from-[#5258bd] to-[#6d388a]'
                  } group relative inline-flex items-center  justify-center overflow-hidden rounded-md bg-gradient-to-r 
                      p-0.5 text-sm font-medium text-white group-hover:bg-opacity-0 group-hover:from-purple-600 group-hover:to-blue-500`}
                >
                  <span
                    className={`text relative inline-flex w-full items-center justify-center rounded ${
                      isDisabled
                        ? 'bg-gray-900 text-white/60 '
                        : isSelected
                        ? ' bg-opacity-0 group-hover:bg-opacity-0'
                        : 'bg-gray-900/50 bg-opacity-0 group-hover:bg-opacity-0'
                    } px-1 py-2.5 pl-5 uppercase transition-all duration-75  
                    ease-in  md:px-5`}
                  >
                    {entry[0]} {currentNetwork.nativeCurrency?.symbol}
                    <div className={`ml-2 ${isDisabled && 'opacity-75'}`}>
                      <MoonbeamIcon />
                    </div>
                  </span>
                </button>
              );
            })}
        </div>
        <button
          key='button'
          onClick={onFlipClick}
          className=' group  relative mt-8 mr-2 inline-flex w-full  items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#5258bd] to-[#6d388a] p-0.5 text-sm font-medium text-white hover:text-white focus:from-purple-600 focus:to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
        >
          <span className='relative w-full rounded bg-dark px-5 py-2.5 text-lg font-extrabold uppercase transition-all duration-75 ease-in	group-hover:bg-opacity-0 group-focus:bg-opacity-0 dark:bg-gray-900'>
            Double or nothing
          </span>
        </button>
        <p className='mt-2 text-xs text-white'>
          Get DEV tokens at the{' '}
          <UnderlineLink href='https://apps.moonbeam.network/moonbase-alpha/faucet/'>
            Moonbase Alpha Faucet
          </UnderlineLink>
          .
        </p>
      </div>
    </>
  );
};

export default ChoicesSection;

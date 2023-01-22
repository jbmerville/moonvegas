import { faBook, faCircleInfo, faCoins, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';
import PopUp from '@/components/popup';

import { currentCoinFlipAddress, currentNetwork, currentRaffleAddress } from '@/config';

interface CoinFlipInfoCardsSectionProps {
  totalFlips: number;
  totalVolume: number;
}

const CoinFlipInfoCardsSection = (props: CoinFlipInfoCardsSectionProps) => {
  const [isReadRulesPopUpOpen, setIsReadRulesPopUpOpen] = useState(false);
  const { totalFlips, totalVolume } = props;

  const onReadRulesClick = () => {
    setIsReadRulesPopUpOpen(!isReadRulesPopUpOpen);
  };

  return (
    <>
      {
        // Desktop
      }
      <div className='hidden min-w-full grow flex-row justify-between md:flex'>
        <div className='layout my-10 flex items-center justify-between'>
          <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-3'>
            <div className='text flex uppercase text-white opacity-75'>
              <FontAwesomeIcon icon={faCoins} size='xs' className='mr-2 w-4' />
              Total Flips
            </div>
            <div className='flex text-xl font-bold uppercase text-white'>{totalFlips}</div>
          </div>
          <div className='mx-5 flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-3'>
            <div className='text flex uppercase text-white opacity-75'>
              <FontAwesomeIcon icon={faBook} size='xs' className='mr-2 w-4' />
              How does it work?
            </div>
            <button
              onClick={onReadRulesClick}
              className='cursor-pointer text-xl font-bold uppercase text-white transition-all hover:text-moonbeam-cyan'
            >
              <UnderlineLink href=''>Read the Rules</UnderlineLink>
            </button>
          </div>
          <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-3'>
            <div className='text flex uppercase text-white opacity-75'>
              <FontAwesomeIcon icon={faDollarSign} size='xs' className='mr-2 w-3' />
              Total Volume
            </div>
            <div className='min-w-[150px] text-center text-xl font-bold uppercase text-white'>
              {totalVolume} {currentNetwork.nativeCurrency?.symbol}
            </div>
          </div>
        </div>
      </div>
      {
        // Mobile
      }
      <div className='flex min-w-full grow flex-row justify-between md:hidden'>
        <div className='m-5 flex grow flex-col items-stretch justify-between'>
          <div className='flex grow items-stretch justify-between'>
            <div className='mr-3 flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-2'>
              <div className='flex text-sm uppercase text-white opacity-75'>
                <FontAwesomeIcon icon={faCoins} size='xs' className='mr-2 w-3' />
                Total flips
              </div>
              <p className='text-base font-bold uppercase text-white'>{totalFlips}</p>
            </div>
            <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-2'>
              <div className='flex text-sm uppercase text-white opacity-75'>
                <FontAwesomeIcon icon={faDollarSign} size='xs' className='mr-2 w-2' />
                Total Volume
              </div>
              <p className='min-w-[130px] text-center text-base font-bold uppercase text-white'>
                {totalVolume} {currentNetwork.nativeCurrency?.symbol}
              </p>
            </div>
          </div>
          <div className='mt-3 flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-2'>
            <div className='flex text-xs uppercase text-white opacity-75'>
              <FontAwesomeIcon icon={faBook} size='xs' className='mr-2 w-3' />
              How does it work?
            </div>
            <p
              onClick={onReadRulesClick}
              className='cursor-pointer text-base font-bold uppercase text-white transition-all hover:text-moonbeam-cyan'
            >
              <UnderlineLink href=''>Read the Rules</UnderlineLink>
            </p>
          </div>
        </div>
      </div>
      <PopUp isVisible={isReadRulesPopUpOpen} setIsVisible={setIsReadRulesPopUpOpen}>
        <div className=' text-white md:w-[400px]'>
          <div className='mb-6  flex items-center text-lg text-orange'>
            <div className='mr-3  w-5'>
              <FontAwesomeIcon icon={faCircleInfo} />
            </div>
            CoinFlip Rules
          </div>
          <ul className='mt-4 list-inside list-disc space-y-1 text-sm text-gray-300'>
            <li className='!my-4 flex items-center'>
              <svg
                className='mr-1.5 h-4 w-4 flex-shrink-0 text-blue-500 dark:text-green-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span>
                Select either <span className=' font-extrabold '> HEADS or TAILS</span>, then choose
                the amount of {currentNetwork.nativeCurrency?.symbol} to flip.
              </span>
            </li>
            <li className='!my-4 flex items-center'>
              <svg
                className='mr-1.5 h-4 w-4 flex-shrink-0  text-blue-500 dark:text-green-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span>
                The SmartContract randomly flips a coin. If it is the one you picked, you win and
                you get back
                <span className='font-extrabold'> 2x</span> your{' '}
                {currentNetwork.nativeCurrency?.symbol}. If it&apos;s not the one you picked, you
                lose your {currentNetwork.nativeCurrency?.symbol}. The house keeps 5% of all wins.
              </span>
            </li>
            <li className='!my-4 flex items-center'>
              <svg
                className='mr-1.5 h-4 w-4 flex-shrink-0  text-blue-500 dark:text-green-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span>
                The SmartContract uses an <span className='font-extrabold'>Oracle</span> to ensure
                randomeness is not deterministic.
              </span>
            </li>
            <li className='!my-4 flex items-center'>
              <svg
                className='mr-1.5 h-4 w-4 flex-shrink-0  text-blue-500 dark:text-green-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span>
                Winner also might receives an <span className='font-extrabold'>NFT </span> of a
                MoonVegas CoinFlip coin.
              </span>
            </li>
          </ul>
          <p className='text-center text-xs text-white/50'>
            View CoinFlip Smart Contract in explorer:{' '}
            <UnderlineLink href={currentNetwork.getExplorerAddressLink(currentCoinFlipAddress)}>
              {currentRaffleAddress}
            </UnderlineLink>
          </p>
        </div>
      </PopUp>
    </>
  );
};

export default CoinFlipInfoCardsSection;

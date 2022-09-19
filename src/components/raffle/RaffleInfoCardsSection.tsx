import { faBook, faCircleInfo, faClock, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Countdown from 'react-countdown';

import useRaffle from '@/hooks/useRaffle';

import UnderlineLink from '@/components/links/UnderlineLink';
import PopUp from '@/components/popup';

import { currentNetwork } from '@/config';

import { TicketType } from '@/types';

interface RaffleInfoCardsSectionPropsType {
  selectedTickets: TicketType[];
}

const RaffleInfoCardsSection = (props: RaffleInfoCardsSectionPropsType) => {
  const { draftTime, ticketsLeft, tickets } = useRaffle();
  const [isReadRulesPopUpOpen, setIsReadRulesPopUpOpen] = useState(false);

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
              <FontAwesomeIcon icon={faHourglassEnd} size='xs' className='mr-2 w-3' />
              tickets left
            </div>
            <div className='flex text-xl font-bold uppercase text-white'>
              {ticketsLeft.length - props.selectedTickets.length}/{tickets.length}
            </div>
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
              <FontAwesomeIcon icon={faClock} size='xs' className='mr-2 w-4' />
              Ends
            </div>
            <div className='min-w-[150px] text-center text-xl font-bold uppercase text-white'>
              <Countdown date={draftTime?.getTime()} />
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
                <FontAwesomeIcon icon={faHourglassEnd} size='xs' className='mr-2 w-2' />
                tickets left
              </div>
              <p className='text-base font-bold uppercase text-white'>
                {ticketsLeft.length - props.selectedTickets.length}/{tickets.length}
              </p>
            </div>
            <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-2'>
              <div className='flex text-sm uppercase text-white opacity-75'>
                <FontAwesomeIcon icon={faClock} size='xs' className='mr-2 w-3' />
                Ends
              </div>
              <p className='min-w-[130px] text-center text-base font-bold uppercase text-white'>
                <Countdown date={draftTime.getTime()} />
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
          <div className='mb-6  flex items-center text-orange'>
            <div className='mr-3  w-5'>
              <FontAwesomeIcon icon={faCircleInfo} />
            </div>
            Raffle Rules
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
                Each ticket has the <span className=' px-1 font-extrabold '> same chance </span>
                of being selected.
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
                Winner is picked when either all tickets are{' '}
                <span className='px-1 font-extrabold'>sold out or the timer ends</span>. Whichever
                comes first.
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
                The SmartContract uses an <span className='px-1 font-extrabold'>Oracle</span> to
                ensure randomeness is not deterministic.
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
                Winner receives <span className='px-1 font-extrabold'>95%</span> of all the{' '}
                {currentNetwork.nativeCurrency?.symbol} in the pool. The house keeps 5%.
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
                Winner also receives an{' '}
                <span className='px-1 font-extrabold'>NFT of the winning ticket</span>.
              </span>
            </li>
          </ul>
        </div>
      </PopUp>
    </>
  );
};

export default RaffleInfoCardsSection;

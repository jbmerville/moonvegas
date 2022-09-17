import React from 'react';
import Countdown from 'react-countdown';

import useRaffle from '@/hooks/useRaffle';

import { TicketType } from '@/types';

interface RaffleInfoCardsSectionPropsType {
  selectedTickets: TicketType[];
}

const RaffleInfoCardsSection = (props: RaffleInfoCardsSectionPropsType) => {
  const { draftTime, ticketsLeft, tickets } = useRaffle();

  return (
    <>
      {
        // Desktop
      }
      <div className='hidden min-w-full grow flex-row justify-between md:flex'>
        <div className='layout my-10 flex items-center justify-between'>
          <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-3'>
            <p className='text uppercase text-white opacity-75'>tickets left</p>
            <p className='text-xl font-bold uppercase text-white'>
              {ticketsLeft.length - props.selectedTickets.length}/{tickets.length}
            </p>
          </div>
          <div className='mx-5 flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-3'>
            <p className='text uppercase text-white opacity-75'>How does it work?</p>
            <p className='cursor-pointer text-xl font-bold uppercase text-white transition-all hover:text-moonbeam-cyan'>
              Read the Rules
            </p>
          </div>
          <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-3'>
            <p className='text uppercase text-white opacity-75'>Ends</p>
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
              <p className='text-sm uppercase text-white opacity-75'>tickets left</p>
              <p className='text-base font-bold uppercase text-white'>
                {ticketsLeft.length - props.selectedTickets.length}/{tickets.length}
              </p>
            </div>
            <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-2'>
              <p className='text-sm uppercase text-white opacity-75'>Ends</p>
              <p className='min-w-[130px] text-center text-base font-bold uppercase text-white'>
                <Countdown date={draftTime.getTime()} />
              </p>
            </div>
          </div>
          <div className='mt-3 flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-2'>
            <p className='text-xs uppercase text-white opacity-75'>How does it work?</p>
            <p className='cursor-pointer text-base font-bold uppercase text-white transition-all hover:text-moonbeam-cyan'>
              Read the Rules
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaffleInfoCardsSection;

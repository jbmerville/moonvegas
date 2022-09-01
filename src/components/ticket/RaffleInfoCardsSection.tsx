import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

import { TicketType } from '@/types';

interface RaffleInfoCardsSectionPropsType {
  tickets: TicketType[];
  selectedTickets: TicketType[];
}

const RaffleInfoCardsSection = (props: RaffleInfoCardsSectionPropsType) => {
  const [amountSold, setAmountSold] = useState(0);

  useEffect(() => {
    setAmountSold(
      props.tickets.filter((ticket) => ticket.sold === undefined).length
    );
  }, [props.tickets]);

  return (
    <>
      {
        // Desktop
      }
      <div className='hidden min-w-full grow flex-row justify-between md:flex'>
        <div className='layout mt-10 mb-10 flex items-center justify-between'>
          <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-4'>
            <p className='text uppercase text-white opacity-75'>tickets left</p>
            <p className='text-2xl font-bold uppercase text-white'>
              {100 - amountSold - props.selectedTickets.length}/{100}
            </p>
          </div>
          <div className='mx-5 flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-4'>
            <p className='text uppercase text-white opacity-75'>
              How does it work?
            </p>
            <p className='cursor-pointer text-2xl font-bold uppercase text-white transition-all hover:text-moonbeam-cyan'>
              Read the Rules
            </p>
          </div>
          <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-4'>
            <p className='text uppercase text-white opacity-75'>Draft start</p>
            <p className='min-w-[150px] text-center text-2xl font-bold uppercase text-white'>
              <Countdown date={Date.now() + 1000 * 60 * 60 * 24 * 3} />
            </p>
          </div>
        </div>
      </div>
      {
        // Mobile
      }
      <div className='flex min-w-full grow flex-row justify-between md:hidden'>
        <div className='m-5 flex grow flex-col items-stretch justify-between'>
          <div className='flex grow items-stretch justify-between'>
            <div className='mr-3 flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-4'>
              <p className='text uppercase text-white opacity-75'>
                tickets left
              </p>
              <p className='text-xl font-bold uppercase text-white'>
                {100 - amountSold - props.selectedTickets.length}/{100}
              </p>
            </div>
            <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-4'>
              <p className='text uppercase text-white opacity-75'>
                Draft start
              </p>
              <p className='min-w-[130px] text-center text-xl font-bold uppercase text-white'>
                <Countdown date={Date.now() + 1000 * 60 * 60 * 24 * 3} />
              </p>
            </div>
          </div>
          <div className='mt-3 flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-4'>
            <p className='text uppercase text-white opacity-75'>
              How does it work?
            </p>
            <p className='cursor-pointer text-xl font-bold uppercase text-white transition-all hover:text-moonbeam-cyan'>
              Read the Rules
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaffleInfoCardsSection;

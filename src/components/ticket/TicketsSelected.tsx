import Image from 'next/image';
import React, { ReactNode } from 'react';

import Button from '@/components/buttons/Button';
import MoonbeamIcon from '@/components/icons/MoonbeamIcon';

import moonbeam from '../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

interface TicketsSelectedPropsType {
  selectedTickets: TicketType[];
  toggleSelectedTickets: (ticket: TicketType) => void;
}

const TicketsSelected = (props: TicketsSelectedPropsType) => {
  const renderMiniatureSelectedTicket = (ticket: TicketType): ReactNode => {
    return (
      <div
        onClick={() => props.toggleSelectedTickets(ticket)}
        className='z-10  mx-2 ml-[-20px] flex h-[90px] min-w-[40px] cursor-pointer flex-col rounded bg-moonbeam-cyan px-4 py-2 shadow-[0_0px_20px_-4px_rgb(0,0,0)] transition-all md:h-[150px] md:min-w-[90px]  md:shadow-[0_0px_52px_-7px_rgb(0,0,0)]'
      >
        <div className='neonTextPink rounded-full text-lg md:text-2xl'>{ticket.id}</div>
        <div className='flex grow items-center justify-center'>
          <div className='mb-3'>
            <div className='mb-8 hidden md:block'>
              <Image src={moonbeam} layout='fixed' height='50px' width='50px' alt='' />
            </div>
            <div className='block md:hidden'>
              <Image src={moonbeam} layout='fixed' height='25px' width='25px' alt='' />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='layout mx-10 flex items-center justify-between md:mx-4'>
      <div className='flex w-full flex-col items-start justify-start rounded '>
        <p className='mb-1 text-xl uppercase text-moonbeam-cyan md:mb-3 md:text-xl'>
          Selected Tickets
        </p>
        <div className='flex w-full flex-col items-center justify-start  rounded border border-moonbeam-cyan p-2 md:p-5 '>
          <div className='flex w-full items-center justify-start overflow-scroll pl-5'>
            {props.selectedTickets.map(renderMiniatureSelectedTicket)}
          </div>
          <Button
            variant='outline'
            className='mb-3 mt-5 flex bg-moonbeam-cyan/20 hover:bg-moonbeam-cyan/40 md:mt-10'
          >
            <p className='ml-2 '>
              Buy {props.selectedTickets.length} Tickets for {props.selectedTickets.length} GLMR{' '}
            </p>
            <div className='mb-[-3px] ml-2'>
              <MoonbeamIcon />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketsSelected;

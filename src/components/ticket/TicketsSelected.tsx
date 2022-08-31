import Image from 'next/image';
import React, { ReactNode } from 'react';

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
        className='mx-2 ml-[-20px] flex h-[150px] min-w-[90px] cursor-pointer flex-col rounded bg-moonbeam-cyan-light px-4 py-2 shadow-[0_0px_52px_-7px_rgb(0,0,0)]  transition-all'
      >
        <div className='neonTextPink rounded-full text-2xl'>{ticket.id}</div>
        <div className='flex grow items-center justify-center'>
          <div className='mb-3'>
            <Image
              src={moonbeam}
              layout='fixed'
              height='50px'
              width='50px'
              alt=''
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className='flex h-[240px] w-[800px] flex-col items-start justify-start rounded p-4 '>
      <p className='mb-5 text-2xl text-moonbeam-cyan-light'>Selected Tickets</p>

      <div className='flex w-[768px] items-center justify-start overflow-scroll pl-5'>
        {props.selectedTickets.map(renderMiniatureSelectedTicket)}
      </div>
    </div>
  );
};

export default TicketsSelected;

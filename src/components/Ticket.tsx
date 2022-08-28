import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import moonbeam from '../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

interface TicketPropsType {
  ticket: TicketType;
}
const Ticket = (props: TicketPropsType) => {
  const [isSold, setIsSold] = useState(false);

  useEffect(
    () => setIsSold(props.ticket.sold !== undefined),
    [props.ticket.sold]
  );

  if (isSold) {
    return (
      <div className='mx-2 flex h-[200px] min-w-[200px] cursor-pointer flex-col rounded bg-primary-700 px-4 py-2 transition-all'>
        <div className='neonText rounded-full text-3xl'>{props.ticket.id}</div>
        <div className='rounded-full text-xl text-white'>
          {props.ticket.sold}
        </div>
      </div>
    );
  }

  return (
    <div className='mx-2 flex h-[350px] min-w-[200px] cursor-pointer flex-col rounded bg-primary-500 px-4 py-2 transition-all hover:mt-[100px] hover:bg-primary-300'>
      <div className='neonText rounded-full text-3xl'>{props.ticket.id}</div>
      <div className='flex grow items-center justify-center'>
        <div className='mb-8'>
          <Image
            src={moonbeam}
            layout='fixed'
            height='100px'
            width='100px'
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default Ticket;

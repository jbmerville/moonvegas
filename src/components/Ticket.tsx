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

  if (isSold && props.ticket.sold) {
    const address = props.ticket.sold;
    return (
      <div className='mx-2 flex h-[200px] min-w-[200px] cursor-pointer flex-col rounded bg-moonbeam-blue px-4 py-2 transition-all'>
        <div className='neonTextPink rounded-full text-3xl'>
          {props.ticket.id}
        </div>
        <div className='rounded-full text-white'>
          {`${address.substring(0, 4)}...${address.substring(
            address.length - 4
          )}`}
        </div>
      </div>
    );
  }

  return (
    <div className='mx-2 flex h-[350px] min-w-[200px] cursor-pointer flex-col rounded bg-moonbeam-cyan-light px-4 py-2 transition-all hover:mt-[100px]'>
      <div className='neonTextPink rounded-full text-3xl'>
        {props.ticket.id}
      </div>
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

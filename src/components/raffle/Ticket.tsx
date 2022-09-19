import { shortenAddress, useEthers } from '@usedapp/core';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import moonbeam from '../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

interface TicketPropsType {
  ticket: TicketType;
  toggleSelectedTickets: (ticket: TicketType) => void;
}
const Ticket = (props: TicketPropsType) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const { account } = useEthers();

  useEffect(() => {
    setIsOwner(props.ticket.owner !== undefined);
  }, [props.ticket.owner]);

  const toggleHover = () => {
    setIsHover((isHoverVal) => !isHoverVal);
  };

  // Ticket is sold and is owned by the current account
  if (props.ticket.owner && props.ticket.owner === account) {
    return (
      <div className='h-[210px] md:h-[400px]'>
        <div
          className={`mx-1 md:mx-2 ${
            isHover || props.ticket.isSelected ? 'mt-10' : ''
          }  flex h-[165px] min-w-[100px] cursor-pointer flex-col rounded border bg-moonbeam-pink px-2 py-2 transition-all md:h-[350px] md:min-w-[200px]`}
        >
          <div className='neonTextBlue rounded-full text-2xl md:mt-[-10px] md:text-4xl'>
            {props.ticket.id}
          </div>
          <div className='flex grow items-center justify-center'>
            <div className='mt-16 hidden md:block'>
              <Image src={moonbeam} layout='fixed' height='100px' width='100px' alt='' />
            </div>
            <div className='mt-6 block md:hidden'>
              <Image src={moonbeam} layout='fixed' height='50px' width='50px' alt='' />
            </div>
          </div>
          <p className='mb-4 flex grow items-center justify-center text-center text-[10px] uppercase text-white md:text-xl'>
            you own this ticket
          </p>
        </div>
      </div>
    );
  }

  // Ticket is sold and is owned by someone other than the current account
  if (isOwner && props.ticket.owner) {
    const address = props.ticket.owner;
    return (
      <div className='mx-1 flex h-[130px] min-w-[100px] cursor-pointer flex-col justify-between rounded bg-moonbeam-grey-light px-2 py-2 transition-all md:mx-2 md:h-[250px] md:min-w-[200px]'>
        <div className='neonTextPink text-2xl md:mt-[-10px] md:text-4xl'>{props.ticket.id}</div>
        <div className='flex grow items-center justify-center'>
          <p className='mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-moonbeam-blue p-5 text-base font-bold text-white md:h-[100px] md:w-[100px] md:text-2xl'>
            SOLD
          </p>
        </div>
        <div className='rounded-full text-xs text-white md:text-lg'>{shortenAddress(address)}</div>
      </div>
    );
  }

  // Ticket is not owned
  return (
    <div
      onMouseEnter={toggleHover}
      onClick={() => props.toggleSelectedTickets(props.ticket)}
      onMouseLeave={toggleHover}
      className='h-[210px] md:h-[400px]'
    >
      <div
        className={`mx-1 md:mx-2 ${
          isHover || props.ticket.isSelected ? 'mt-10' : ''
        } flex h-[165px] min-w-[100px] cursor-pointer flex-col rounded md:h-[350px] md:min-w-[200px] ${
          props.ticket.isSelected ? 'bg-moonbeam-cyan' : 'bg-moonbeam-blue'
        } border px-2 py-2 transition-all`}
      >
        <div className='neonTextPink rounded-full text-2xl md:mt-[-10px] md:text-4xl'>
          {props.ticket.id}
        </div>
        <div className='flex grow items-center justify-center'>
          <div className='mb-8 hidden md:block'>
            <Image src={moonbeam} layout='fixed' height='100px' width='100px' alt='' />
          </div>
          <div className='mb-4 block md:hidden'>
            <Image src={moonbeam} layout='fixed' height='50px' width='50px' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;

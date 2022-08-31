import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

import Button from '@/components/buttons/Button';
import Ticket from '@/components/ticket/Ticket';
import TicketsSelected from '@/components/ticket/TicketsSelected';

import { TicketType } from '@/types';

interface TicketSectionPropsType {
  tickets: TicketType[];
}

const TicketSection = (props: TicketSectionPropsType) => {
  const [selectedTickets, setSelectedTickets] = useState<TicketType[]>([]);
  const [amountSold, setAmountSold] = useState(0);

  const toggleSelectedTickets = (ticket: TicketType): void => {
    if (selectedTickets.includes(ticket)) {
      setSelectedTickets((selectedTickets) =>
        selectedTickets.filter((item) => item.id !== ticket.id)
      );
      ticket.isSelected = false;
    } else {
      setSelectedTickets((selectedTickets) => {
        return [...selectedTickets, ticket].sort((a, b) =>
          a.id < b.id ? -1 : 1
        );
      });
      ticket.isSelected = true;
    }
  };

  useEffect(() => {
    setAmountSold(
      props.tickets.filter((ticket) => ticket.sold === undefined).length
    );
  }, [props.tickets]);

  return (
    <>
      <div className='flex min-w-full grow flex-row justify-between'>
        <div className='layout mt-10 mb-10 flex items-center justify-between'>
          <div className='flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-4'>
            <p className='text uppercase text-white opacity-75'>tickets left</p>
            <p className='text-2xl font-bold uppercase text-white'>
              {100 - amountSold - selectedTickets.length}/{100}
            </p>
          </div>
          <div className='mx-5 flex grow flex-col items-center justify-center rounded bg-gradient-to-r from-[#5258bd] to-[#6d388a] py-4'>
            <p className='text uppercase text-white opacity-75'>
              How does it work?
            </p>
            <p className='cursor-pointer text-2xl font-bold uppercase text-white transition-all hover:text-moonbeam-cyan-light'>
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
      <div className='flex h-full	w-full items-start justify-start overflow-scroll'>
        {props.tickets.map((ticket) => (
          <Ticket
            toggleSelectedTickets={toggleSelectedTickets}
            ticket={ticket}
            key={ticket.id}
          />
        ))}
      </div>
      <div className='flex flex-col items-center justify-center'>
        <TicketsSelected
          selectedTickets={selectedTickets}
          toggleSelectedTickets={toggleSelectedTickets}
        />
        <Button variant='outline' className='mt-10'>
          <p className='ml-2 '>
            Buy {selectedTickets.length} Tickets for {selectedTickets.length}{' '}
            GLMR
          </p>
        </Button>
      </div>
    </>
  );
};

export default TicketSection;

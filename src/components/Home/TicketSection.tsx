import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

import Button from '@/components/buttons/Button';
import Ticket from '@/components/Home/Ticket';
import TicketsSelected from '@/components/Home/TicketsSelected';

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
        <div className='layout mt-10 mb-10 flex  items-center justify-between'>
          <p className='text-2xl text-moonbeam-pink'>
            {100 - amountSold}/{100} tickets left
          </p>
          <p className='text-2xl text-moonbeam-pink'>
            <Countdown date={Date.now() + 1000 * 60 * 60 * 24 * 3} /> until
            draft
          </p>
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

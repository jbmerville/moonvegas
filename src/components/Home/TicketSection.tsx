import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import Ticket from '@/components/Home/Ticket';
import TicketsSelected from '@/components/Home/TicketsSelected';

import { TicketType } from '@/types';

interface TicketSectionPropsType {
  tickets: TicketType[];
}

const TicketSection = (props: TicketSectionPropsType) => {
  const [selectedTickets, setSelectedTickets] = useState<TicketType[]>([]);
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

  return (
    <>
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
        <Button variant='outline'>
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

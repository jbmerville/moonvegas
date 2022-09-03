import React, { useState } from 'react';

import RaffleInfoCardsSection from '@/components/ticket/RaffleInfoCardsSection';
import Ticket from '@/components/ticket/Ticket';
import TicketsSelected from '@/components/ticket/TicketsSelected';

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
        return [...selectedTickets, ticket].sort((a, b) => (a.id < b.id ? -1 : 1));
      });
      ticket.isSelected = true;
    }
  };

  return (
    <>
      <RaffleInfoCardsSection tickets={props.tickets} selectedTickets={selectedTickets} />
      <div className='flex h-full	w-full items-start justify-start overflow-scroll'>
        {props.tickets.map((ticket) => (
          <Ticket toggleSelectedTickets={toggleSelectedTickets} ticket={ticket} key={ticket.id} />
        ))}
      </div>
      <div className='flex flex-col items-center justify-center'>
        <TicketsSelected
          selectedTickets={selectedTickets}
          toggleSelectedTickets={toggleSelectedTickets}
        />
      </div>
    </>
  );
};

export default TicketSection;

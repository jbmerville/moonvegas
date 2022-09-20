import React, { useState } from 'react';

import useRaffle from '@/hooks/useRaffle';

import RaffleInfoCardsSection from '@/components/raffle/RaffleInfoCardsSection';
import Ticket from '@/components/raffle/Ticket';
import TicketsSelected from '@/components/raffle/TicketsSelected';

import { TicketType } from '@/types';

const TicketSelectionSection = () => {
  const [selectedTickets, setSelectedTickets] = useState<TicketType[]>([]);
  const { tickets } = useRaffle();

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

  const resetTicketsSelected = () => {
    setSelectedTickets([]);
  };

  return (
    <>
      <RaffleInfoCardsSection selectedTickets={selectedTickets} />
      <div className='flex w-full items-start justify-start overflow-x-scroll	'>
        {tickets.map((ticket) => (
          <Ticket toggleSelectedTickets={toggleSelectedTickets} ticket={ticket} key={ticket.id} />
        ))}
      </div>
      <div className='mt-5 flex flex-col items-center justify-center md:mt-10'>
        <TicketsSelected
          selectedTickets={selectedTickets}
          toggleSelectedTickets={toggleSelectedTickets}
          resetTicketsSelected={resetTicketsSelected}
        />
      </div>
    </>
  );
};

export default TicketSelectionSection;

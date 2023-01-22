import React, { useState } from 'react';
import { toast } from 'react-toastify';

import useRaffle from '@/hooks/useRaffle';

import { getNonDefaultTicketsSelected } from '@/components/raffle/helper';
import RaffleInfoCardsSection from '@/components/raffle/RaffleInfoCardsSection';
import Ticket from '@/components/raffle/Ticket';
import TicketsSelected from '@/components/raffle/TicketsSelected';

import { TicketType } from '@/types';

const MAX_TICKET = 5;

const TicketSelectionSection = () => {
  const [selectedTickets, setSelectedTickets] = useState<TicketType[]>(
    Array(MAX_TICKET).fill({ id: -1, isSelected: false })
  );
  const { tickets } = useRaffle();

  const toggleSelectedTickets = (ticket: TicketType): void => {
    if (selectedTickets.includes(ticket)) {
      setSelectedTickets((selectedTickets) =>
        selectedTickets.map((item) => {
          if (item.id === ticket.id) {
            return { id: -1, isSelected: false };
          } else {
            return item;
          }
        })
      );
      ticket.isSelected = false;
    } else {
      if (getNonDefaultTicketsSelected(selectedTickets).length >= MAX_TICKET) {
        toast.error(
          `You already have selected the maximum of ${MAX_TICKET} tickets per transaction.`
        );
        return;
      }
      setSelectedTickets((selectedTickets) => {
        const firstDefaultTicketIndex = selectedTickets.findIndex((item) => item.id === -1);

        return [
          ...selectedTickets.slice(0, firstDefaultTicketIndex),
          ticket,
          ...selectedTickets.slice(firstDefaultTicketIndex + 1),
        ];
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
      <div className='mt-10 mb-2 flex w-full items-start justify-center overflow-x-scroll	'>
        {tickets.map((ticket) => (
          <Ticket toggleSelectedTickets={toggleSelectedTickets} ticket={ticket} key={ticket.id} />
        ))}
      </div>
      <div className=' flex flex-col items-center justify-center'>
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

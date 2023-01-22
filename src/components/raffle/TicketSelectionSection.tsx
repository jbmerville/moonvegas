import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useIsMobile from '@/hooks/useIsMobile';
import useRaffle from '@/hooks/useRaffle';

import { getMaxTicketPerTx, getNonDefaultTicketsSelected } from '@/components/raffle/helper';
import InfoCards from '@/components/raffle/InfoCards';
import Ticket from '@/components/raffle/Ticket';
import TicketsSelected from '@/components/raffle/TicketsSelected';

import { TicketType } from '@/types';

const TicketSelectionSection = () => {
  const isMobile = useIsMobile();
  const maxTicketPerTx = getMaxTicketPerTx(isMobile);
  const [selectedTickets, setSelectedTickets] = useState<TicketType[]>(
    Array(maxTicketPerTx).fill({ id: -1, isSelected: false })
  );

  useEffect(() => {
    setSelectedTickets(Array(maxTicketPerTx).fill({ id: -1, isSelected: false }));
  }, [maxTicketPerTx]);

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
      if (getNonDefaultTicketsSelected(selectedTickets).length >= maxTicketPerTx) {
        toast.error(
          `You already have selected the maximum of ${maxTicketPerTx} tickets per transaction.`
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
      <InfoCards selectedTickets={selectedTickets} />
      <div className='mb-4 mt-2 flex w-full items-start justify-center overflow-x-scroll md:mt-10 md:mb-4	'>
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

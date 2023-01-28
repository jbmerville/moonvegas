import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useIsMobile from '@/hooks/useIsMobile';

import { getMaxTicketPerTx, getNonDefaultTicketsSelected } from '@/components/raffle/helper';
import InfoCards from '@/components/raffle/InfoCards';
import Ticket from '@/components/raffle/Ticket';
import TicketsSelected from '@/components/raffle/TicketsSelected';

import RaffleContext from '@/contexts/RaffleContext';

import { TicketType } from '@/types';

const TicketSelectionSection = () => {
  const isMobile = useIsMobile();
  const maxTicketPerTx = getMaxTicketPerTx(isMobile);
  const [selectedTickets, setSelectedTickets] = useState<TicketType[]>(
    Array(maxTicketPerTx).fill({ id: -1, isSelected: false })
  );
  const { raffleState } = useContext(RaffleContext);

  useEffect(() => {
    setSelectedTickets(Array(maxTicketPerTx).fill({ id: -1, isSelected: false }));
  }, [maxTicketPerTx]);

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
        toast.dark(`Maximum of ${maxTicketPerTx} tickets reached.`, {
          type: toast.TYPE.WARNING,
        });
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
    setSelectedTickets(Array(maxTicketPerTx).fill({ id: -1, isSelected: false }));
  };

  return (
    <>
      <InfoCards />
      <div className='mb-4 mt-2 flex w-full items-start justify-start overflow-x-scroll md:mt-10 md:mb-4	'>
        {raffleState.tickets.map((ticket) => (
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

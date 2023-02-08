import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useIsMobile from '@/hooks/useIsMobile';

import Loading from '@/components/icons/Loading';
import RaffleSelectedTickets from '@/components/pages/raffle/RaffleSelectedTickets';
import RaffleTicket from '@/components/pages/raffle/RaffleTicket';
import { getMaxRaffleTicketPerTransaction, getNonDefaultRaffleSelectedTickets } from '@/components/pages/raffle/utils';

import { useRaffleContext } from '@/contexts/RaffleContext';

import { RaffleTicketType } from '@/types';

const RaffleTicketSelection = () => {
  const isMobile = useIsMobile();
  const maxRaffleTicketPerTx = getMaxRaffleTicketPerTransaction(isMobile);
  const [selectedRaffleTickets, setSelectedRaffleTickets] = useState<RaffleTicketType[]>(
    Array(maxRaffleTicketPerTx).fill({ id: -1, isSelected: false })
  );
  const { raffleState, isRaffleStateFetching } = useRaffleContext();

  useEffect(() => {
    setSelectedRaffleTickets(Array(maxRaffleTicketPerTx).fill({ id: -1, isSelected: false }));
  }, [maxRaffleTicketPerTx]);

  const toggleSelectedRaffleTickets = (ticket: RaffleTicketType): void => {
    if (selectedRaffleTickets.includes(ticket)) {
      setSelectedRaffleTickets((selectedRaffleTickets) =>
        selectedRaffleTickets.map((item) => {
          if (item.id === ticket.id) {
            return { id: -1, isSelected: false };
          } else {
            return item;
          }
        })
      );
      ticket.isSelected = false;
    } else {
      if (getNonDefaultRaffleSelectedTickets(selectedRaffleTickets).length >= maxRaffleTicketPerTx) {
        toast.dark(`Maximum of ${maxRaffleTicketPerTx} tickets reached`, {
          type: toast.TYPE.WARNING,
        });
        return;
      }
      setSelectedRaffleTickets((selectedRaffleTickets) => {
        const firstDefaultRaffleTicketIndex = selectedRaffleTickets.findIndex((item) => item.id === -1);

        return [
          ...selectedRaffleTickets.slice(0, firstDefaultRaffleTicketIndex),
          ticket,
          ...selectedRaffleTickets.slice(firstDefaultRaffleTicketIndex + 1),
        ];
      });
      ticket.isSelected = true;
    }
  };

  const resetRaffleSelectedTickets = () => {
    setSelectedRaffleTickets(Array(maxRaffleTicketPerTx).fill({ id: -1, isSelected: false }));
  };

  return (
    <>
      <div className='mb-4 mt-8 flex w-full items-center justify-center md:mt-10 md:mb-4'>
        {!isRaffleStateFetching ? (
          <div className=' flex w-full items-start justify-start overflow-x-scroll 	'>
            {raffleState.tickets.map((ticket: RaffleTicketType) => (
              <RaffleTicket toggleSelectedRaffleTickets={toggleSelectedRaffleTickets} ticket={ticket} key={ticket.id} />
            ))}
          </div>
        ) : (
          <div className='scale-125 md:scale-150'>
            <Loading />
          </div>
        )}
      </div>
      <div className='flex flex-col items-center justify-center'>
        <RaffleSelectedTickets
          selectedRaffleTickets={selectedRaffleTickets}
          toggleSelectedRaffleTickets={toggleSelectedRaffleTickets}
          resetRaffleSelectedTickets={resetRaffleSelectedTickets}
        />
      </div>
    </>
  );
};

export default RaffleTicketSelection;

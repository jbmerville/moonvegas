import MoonbeamIcon from '@/components/icons/MoonbeamIcon';

import { MAX_RAFFLE_TICKET_PER_TX, MAX_RAFFLE_TICKET_PER_TX_MOBILE } from '@/constants/env';

import { TicketType } from '@/types';

export const getNonDefaultTicketsSelected = (selectedTickets: TicketType[]): TicketType[] => {
  return selectedTickets.filter((ticket) => ticket.id !== -1);
};

export const renderTxPrice = (value: string) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='scale-[0.9] rounded-full bg-dark p-1 md:scale-[1.5]'>
        <MoonbeamIcon />
      </div>
      <p className='ml-1 md:ml-5'>{value}</p>
    </div>
  );
};

export const getMaxTicketPerTx = (isMobile: boolean) => {
  return isMobile ? MAX_RAFFLE_TICKET_PER_TX_MOBILE : MAX_RAFFLE_TICKET_PER_TX;
};

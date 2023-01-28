/* eslint-disable @typescript-eslint/no-explicit-any */
import { shortenAddress } from '@usedapp/core';
import Image from 'next/image';
import React, { ReactNode, useContext } from 'react';

import { renderTxPrice } from '@/components/raffle/helper';
import Table from '@/components/Table';
import { TableRowType } from '@/components/Table/TableRow';

import RaffleContext from '@/contexts/RaffleContext';

import moonbeam from '../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

export interface TransactionType {
  address: string;
  date: Date;
  ticketsBought: TicketType[];
  price: string;
  hash: string;
  block: string;
}

const WinnerHistoryTable = () => {
  const { raffleState } = useContext(RaffleContext);

  const renderRowsFromTx = (): TableRowType<any>[] => {
    return raffleState.raffleHistory.map((history) => ({
      inputs: [
        {
          value: history.winner,
          transformation: shortenAddress,
        },
        {
          value: history.ticketPrice * history.totalTickets,
          transformation: renderTxPrice,
        },
        {
          value: { id: history.winningTicket, isSelected: false },
          transformation: renderMiniatureSelectedTicket,
          transformationMobile: (value: TicketType) => value.id,
        },
        {
          value: history.totalTickets,
        },
      ],
    }));
  };

  const renderMiniatureSelectedTicket = (ticket: TicketType): ReactNode => {
    return (
      <div
        key={ticket.id}
        className='mx-2 ml-[-15px] flex h-[50px] w-[40px] flex-col items-center justify-center rounded border bg-moonbeam-grey-dark px-2 py-2 shadow-[0_0px_20px_-7px_rgb(0,0,0)]  transition-all'
      >
        <div className='neonTextPink text h-[20px]'>{ticket.id}</div>
        <div className='flex grow items-center justify-center'>
          <div className=''>
            <Image src={moonbeam} layout='fixed' height='15px' width='15px' alt='' />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Table
      title='Winner History'
      header={{
        inputs: [
          { value: 'Address' },
          { value: 'Price Pool' },
          { value: 'Winning Ticket' },
          { value: 'Total Tickets' },
        ],
      }}
      rows={renderRowsFromTx()}
      emptyRowMessage='No raffle winners yet.'
    ></Table>
  );
};

export default WinnerHistoryTable;

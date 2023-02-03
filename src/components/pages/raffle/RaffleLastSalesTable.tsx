/* eslint-disable @typescript-eslint/no-explicit-any */
import { shortenAddress } from '@usedapp/core';
import Image from 'next/image';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { getRaffleTransactionHistory, RaffleTransactionType, renderTxPrice } from '@/components/pages/raffle/utils';
import Table from '@/components/Table';
import { TableRowType } from '@/components/Table/TableRow';

import { currentNetwork } from '@/config';
import RaffleContext from '@/contexts/RaffleContext';

import moonbeam from '../../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

const RaffleLastSalesTable = () => {
  const [transactions, setTransactions] = useState<RaffleTransactionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { raffleState } = useContext(RaffleContext);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const raffleTransactionHistory = await getRaffleTransactionHistory();
      if (raffleTransactionHistory.length > transactions.length) {
        setTransactions(raffleTransactionHistory);
      }
      setIsLoading(false);
    };

    fetchHistory();
  }, [raffleState.ticketsBought.length]); // Refresh when tickets updates (some tickets have been bought)

  const renderRowsFromTx = (): TableRowType<any>[] => {
    return transactions.map((transaction: RaffleTransactionType) => ({
      inputs: [
        {
          value: transaction.date,
          transformation: (value: Date) => value.toLocaleString(),
          transformationMobile: (value: Date) => value.toLocaleDateString(),
        },
        { value: transaction.address, transformation: shortenAddress },
        {
          value: transaction.ticketsBought,
          transformation: (value: TicketType[]) => (
            <div className='flex w-[220px] items-center justify-center overflow-x-scroll '>
              {value.map(renderMiniatureSelectedTicket)}
            </div>
          ),
          transformationMobile: (value: TicketType[]) => value.length,
        },
        {
          value: transaction.price,
          transformation: renderTxPrice,
        },
      ],
      url: currentNetwork.getExplorerTransactionLink(transaction.hash),
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
      title='Last Tickets Sold'
      header={{
        inputs: [{ value: 'Date' }, { value: 'Address' }, { value: 'Tickets Bought' }, { value: 'Price' }],
      }}
      rows={renderRowsFromTx()}
      isLoading={isLoading}
      emptyRowMessage='No transactions found'
    ></Table>
  );
};

export default RaffleLastSalesTable;

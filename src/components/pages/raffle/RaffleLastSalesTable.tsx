/* eslint-disable @typescript-eslint/no-explicit-any */
import { shortenAddress } from '@usedapp/core';
import { BigNumber, utils } from 'ethers';
import Image from 'next/image';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { renderTxPrice } from '@/components/pages/raffle/helper';
import Table from '@/components/Table';
import { TableRowType } from '@/components/Table/TableRow';

import { currentNetwork, currentRaffleAddress } from '@/config';
import { raffleAbi } from '@/contexts/RaffleContext';
import RaffleContext from '@/contexts/RaffleContext';

import moonbeam from '../../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

export interface TransactionType {
  address: string;
  date: Date;
  ticketsBought: TicketType[];
  price: string;
  hash: string;
  block: string;
}
const MOONBASE_ALPHA_RPC_API_BASE_URL = 'https://api-moonbase.moonscan.io/api';

const RaffleLastSalesTable = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const { raffleState } = useContext(RaffleContext);

  useEffect(() => {
    const fetchHistory = async () => {
      const result = await fetch(
        `${MOONBASE_ALPHA_RPC_API_BASE_URL}?module=account&action=txlist&address=${currentRaffleAddress}`
      );
      const json = await result.json();

      const txHistory = json.result
        .filter((tx: any) => tx.isError === '0' && tx.to !== '') // Remove failed tx and the tx sent to deploy the SC
        .map((tx: any) => {
          return {
            address: tx.from,
            date: new Date(parseInt(tx.timeStamp) * 1000),
            ticketsBought: parseTxInput(tx),
            price: utils.formatEther(BigNumber.from(tx.value)),
            hash: tx.hash,
            block: tx.blockNumber,
          } as TransactionType;
        }) as TransactionType[];
      setTransactions(txHistory.sort((a, b) => (a.date > b.date ? -1 : 1)));
    };

    fetchHistory();
  }, [raffleState.ticketsBought]); // Refresh when tickets updates (some tickets have been bought)

  const parseTxInput = (tx: any) => {
    try {
      const decodedArgs = raffleAbi.decodeFunctionData(tx.input.slice(0, 10), tx.input);
      const functionName = raffleAbi.getFunction(tx.input.slice(0, 10)).name;
      if (functionName == 'purchase') {
        return decodedArgs[0].map((ticketId: BigNumber) => ({
          id: ticketId.toNumber(),
          owner: tx.from,
          isSelected: false,
        })) as TicketType[];
      }
      return [];
    } catch (e) {
      return [];
    }
  };

  const renderRowsFromTx = (): TableRowType<any>[] => {
    return transactions.map((transaction) => ({
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
      emptyRowMessage='No transactions for this raffle yet.'
    ></Table>
  );
};

export default RaffleLastSalesTable;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { shortenAddress } from '@usedapp/core';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { CoinFlipTransactionType, getCoinFlipTransactionHistory } from '@/components/pages/coinflip/utils';
import Table from '@/components/Table';
import { TableRowType } from '@/components/Table/TableRow';

import { currentNetwork } from '@/config';

import coinHeads from '../../../../public/images/coin-heads.png';
import coinTails from '../../../../public/images/coin-tails.png';

import { CoinFace } from '@/types';

const CoinFlipLastSalesTable = () => {
  const [transactions, setTransactions] = useState<CoinFlipTransactionType[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const transactionHistory = await getCoinFlipTransactionHistory();
      setTransactions(transactionHistory);
    };

    fetchHistory();
  }, []);

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
          value: transaction,
          transformation: (value: CoinFlipTransactionType) => {
            return (
              <div>
                Flipped {value.price} {currentNetwork.nativeCurrency?.symbol} and{' '}
                {value.isWin ? (
                  <span className=' text-green-400'>doubled</span>
                ) : (
                  <span className='text-red-500'>got rugged</span>
                )}
              </div>
            );
          },
          transformationMobile: (value: CoinFlipTransactionType) => {
            return value.isWin ? (
              <span className=' text-green-400'>doubled</span>
            ) : (
              <span className=' text-red-500'>got rugged</span>
            );
          },
        },
        {
          value: transaction.choice,
          transformation: (value: CoinFace) => {
            return value === CoinFace.HEADS ? (
              <Image src={coinHeads} layout='fixed' height='40px' width='40px' alt='' />
            ) : (
              <Image src={coinTails} layout='fixed' height='40px' width='40px' alt='' />
            );
          },
          transformationMobile: (value: CoinFace) => {
            return value === CoinFace.HEADS ? (
              <Image src={coinHeads} layout='fixed' height='25px' width='25px' alt='' />
            ) : (
              <Image src={coinTails} layout='fixed' height='25px' width='25px' alt='' />
            );
          },
        },
      ],
      url: currentNetwork.getExplorerTransactionLink(transaction.hash),
    }));
  };

  return (
    <Table
      title='Last Coin Flips'
      header={{
        inputs: [{ value: 'Date' }, { value: 'Address' }, { value: 'Result' }, { value: 'Choice' }],
      }}
      rows={renderRowsFromTx()}
      emptyRowMessage='No transactions for this coin flip yet.'
    ></Table>
  );
};

export default CoinFlipLastSalesTable;

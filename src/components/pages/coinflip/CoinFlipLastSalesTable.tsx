/* eslint-disable @typescript-eslint/no-explicit-any */
import { shortenAddress } from '@usedapp/core';
import { BigNumber, providers, utils } from 'ethers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Table from '@/components/Table';
import { TableRowType } from '@/components/Table/TableRow';

import { currentCoinFlipAddress, currentNetwork } from '@/config';
import { coinFlipAbi } from '@/contexts/CoinFlipContext';

import coinHeads from '../../../../public/images/coin-heads.png';
import coinTails from '../../../../public/images/coin-tails.png';

import { CoinFace } from '@/types';
interface TransactionType {
  address: string;
  date: Date;
  price: string;
  choice?: CoinFace;
  isWin: boolean;
  hash: string;
}
const MOONBASE_ALPHA_RPC_API_BASE_URL = 'https://api-moonbase.moonscan.io/api';

const CoinFlipLastSalesTable = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const parseTxChoice = (tx: any) => {
    try {
      const decodedArgs = coinFlipAbi.decodeFunctionData(tx.input.slice(0, 10), tx.input);
      const functionName = coinFlipAbi.getFunction(tx.input.slice(0, 10)).name;
      if (functionName == 'flip') {
        return decodedArgs[0] === true ? CoinFace.HEADS : CoinFace.TAILS;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const result = await fetch(
        `${MOONBASE_ALPHA_RPC_API_BASE_URL}?module=account&action=txlist&address=${currentCoinFlipAddress}`
      );
      const json = await result.json();
      const provider = new providers.JsonRpcProvider('https://rpc.api.moonbase.moonbeam.network');
      const currentBlock = await provider.getBlockNumber();
      const logs = await provider.getLogs({
        address: currentCoinFlipAddress,
        fromBlock: currentBlock - 50000,
        topics: ['0x3419036def9952f45dbfaa88ccbb2008b3c97cf9fe09f9b8e13e9df7b14b84ae'],
      });

      const eventMap: { [key: string]: boolean } = {};

      logs.forEach((log) => {
        const flipEvent: {
          draw: boolean;
          player: string;
          betAmount: BigNumber;
          playerChoice: boolean;
        } = coinFlipAbi.decodeEventLog('Flip', log.data).round;
        eventMap[log.transactionHash as string] = flipEvent.draw === flipEvent.playerChoice;
      });

      const txHistory = json.result
        .filter((tx: any) => tx.isError === '0' && tx.to !== '') // Remove failed tx and the tx sent to deploy the SC
        .map((tx: any) => {
          return {
            address: tx.from,
            date: new Date(parseInt(tx.timeStamp) * 1000),
            choice: parseTxChoice(tx),
            price: utils.formatEther(BigNumber.from(tx.value)),
            isWin: eventMap[tx.hash] || false,
            hash: tx.hash,
            block: tx.blockNumber,
          } as TransactionType;
        }) as TransactionType[];
      setTransactions(txHistory.sort((a, b) => (a.date > b.date ? -1 : 1)).slice(0, 15));
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
          transformation: (value: TransactionType) => {
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
          transformationMobile: (value: TransactionType) => {
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
              <Image src={coinTails} layout='fixed' height='20px' width='40px' alt='' />
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

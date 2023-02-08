import { BigNumber, providers, utils } from 'ethers/lib/ethers';

import { coinFlipAbi } from '@/contexts/CoinFlipContext';
import { convertLogToFlipEvent } from '@/contexts/CoinFlipContext/utils';

import { CoinFace, ExplorerTransactionType } from '@/types';

export interface CoinFlipTransactionType {
  address: string;
  date: Date;
  price: string;
  choice?: CoinFace;
  isWin: boolean;
  hash: string;
}

export async function getCoinFlipTransactionHistory(
  explorerApiEndpoint: string,
  coinFlipAddress: string
): Promise<CoinFlipTransactionType[]> {
  const result = await fetch(`${explorerApiEndpoint}?module=account&action=txlist&address=${coinFlipAddress}`);
  const json = await result.json();

  const transactions = json.result as ExplorerTransactionType[];
  if (typeof transactions === 'object' && transactions !== null) {
    return (await Promise.all(json.result.filter(shouldTransactionBeFiltered).map(parseExplorerTransaction))).sort(
      sortTransactions
    );
  }
  return [];
}

async function parseExplorerTransaction(
  currentNetworkRpcUrl: string,
  transaction: ExplorerTransactionType,
  coinFlipAddress: string
): Promise<CoinFlipTransactionType> {
  return {
    address: transaction.from,
    date: new Date(parseInt(transaction.timeStamp) * 1000),
    choice: parseTransactionInput(transaction),
    price: utils.formatEther(BigNumber.from(transaction.value)),
    isWin: await getTransactionOutcome(currentNetworkRpcUrl, transaction, coinFlipAddress),
    hash: transaction.hash,
  };
}

async function getTransactionOutcome(
  currentNetworkRpcUrl: string,
  transaction: ExplorerTransactionType,
  coinFlipAddress: string
) {
  const provider = new providers.JsonRpcProvider(currentNetworkRpcUrl);

  const logs = await provider.getLogs({
    address: coinFlipAddress,
    blockHash: transaction.blockHash,
    topics: ['0x3419036def9952f45dbfaa88ccbb2008b3c97cf9fe09f9b8e13e9df7b14b84ae'],
  });

  const matchingEventLogs = logs
    .map(convertLogToFlipEvent)
    .filter((flipEvent) => flipEvent.transactionHash === transaction.hash);
  if (matchingEventLogs.length === 0) {
    return false;
  }
  return matchingEventLogs[0].draw === matchingEventLogs[0].playerChoice;
}

function shouldTransactionBeFiltered(transaction: ExplorerTransactionType): boolean {
  return transaction.isError === '0' && transaction.to !== '' && transaction.methodId !== '0xb2f3d299';
}

function parseTransactionInput(transaction: ExplorerTransactionType): CoinFace | undefined {
  const { input } = transaction;
  try {
    const inputBegining = input.slice(0, 10);
    const decodedArgs = coinFlipAbi.decodeFunctionData(inputBegining, input);
    const functionName = coinFlipAbi.getFunction(inputBegining).name;
    if (functionName == 'flip') {
      return decodedArgs[0] ? CoinFace.HEADS : CoinFace.TAILS;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error while parsing transaction ${transaction.input}`, error);
  }
}

function sortTransactions(transaction1: CoinFlipTransactionType, transaction2: CoinFlipTransactionType) {
  return transaction1.date > transaction2.date ? -1 : 1;
}

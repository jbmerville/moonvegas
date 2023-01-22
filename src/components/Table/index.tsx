/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';

import TableRow from '@/components/Table/TableRow';

import { TicketType } from '@/types';

export interface TransactionType {
  address: string;
  date: Date;
  ticketsBought: TicketType[];
  price: string;
  hash: string;
  block: string;
}

export interface TableRow<T> {
  inputs: Input<T>[];
  url?: string;
}

export interface Input<T> {
  value: T;
  transformation?: (value: T) => ReactNode;
  transformationMobile?: (value: T) => ReactNode;
}

interface TableProps<T> {
  title: string;
  header: TableRow<T>;
  rows: TableRow<T>[];
  emptyRowMessage: string;
}

const Table = (props: TableProps<any>) => {
  const { rows, header, emptyRowMessage, title } = props;

  return (
    <div className='layout mt-10 mb-10 flex flex-col items-start justify-between'>
      <div className='mb-1 flex w-full items-center md:mb-3'>
        <p className='text-center text-xl font-bold text-moonbeam-cyan md:text-3xl'>{title}</p>
      </div>
      <table className='h-full w-full	table-auto border-spacing-0 overflow-hidden	rounded-t-lg text-sm'>
        <thead className=' bg-[#0c0e11]'>
          <TableRow row={header} />
        </thead>
        <tbody className='text-lg'>
          {rows.map((row, i) => (
            <TableRow key={i} row={row} />
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className=' box-border flex h-full w-full grow items-center justify-center border-b-[0.5px] border-[#474d57] py-5'>
          {emptyRowMessage}
        </div>
      )}
    </div>
  );
};

export default Table;

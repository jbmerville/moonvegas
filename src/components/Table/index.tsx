/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import TableRow, { TableRowType } from '@/components/Table/TableRow';

import { TicketType } from '@/types';

export interface TransactionType {
  address: string;
  date: Date;
  ticketsBought: TicketType[];
  price: string;
  hash: string;
  block: string;
}

interface TablePropsType<T> {
  title: string;
  header: TableRowType<T>;
  rows: TableRowType<T>[];
  emptyRowMessage: string;
}

const Table = (props: TablePropsType<any>) => {
  const { rows, header, emptyRowMessage, title } = props;

  return (
    <div className='layout my-6 flex flex-col items-start justify-between md:mt-10 md:mb-10'>
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

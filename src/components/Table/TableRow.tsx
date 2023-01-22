/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { TableRow } from './index';

interface TableRowProps<T> {
  row: TableRow<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableRow = (props: TableRowProps<any>) => {
  const { row } = props;

  return (
    <tr
      onClick={() => row.url && window.open(row.url, '_blank')}
      className={`${
        row.url && 'hover:cursor-pointer hover:bg-[#0c0e11]'
      } box-border border-b-[0.5px] border-[#474d57] text-center `}
    >
      {row.inputs.map((item: any, i: number) => (
        <td key={i} className='p-1 md:p-2 '>
          <div className='hidden justify-center md:flex'>
            {item.transformation ? item.transformation(item.value) : item.value}
          </div>
          <div className='flex justify-center md:hidden'>
            {item.transformationMobile
              ? item.transformationMobile(item.value)
              : item.transformation
              ? item.transformation(item.value)
              : item.value}
          </div>
        </td>
      ))}
      {/* <td className='p-1 md:p-2'>
        <p className='block'>
          <UnderlineLink href={currentNetwork.getExplorerTransactionLink(transaction.hash)}>
            {shortenTransactionHash(transaction.hash)}
          </UnderlineLink>
        </p>
      </td> */}
    </tr>
  );
};

export default TableRow;

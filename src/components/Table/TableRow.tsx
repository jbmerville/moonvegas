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
      } box-border border-b-[1px] border-[#474d57] text-center md:border-b-[0.5px] `}
    >
      {row.inputs.map((item: any, i: number) => (
        <td key={i} className='p-1 md:p-2 '>
          <div className='hidden justify-center md:flex'>
            {item.transformation ? item.transformation(item.value) : item.value}
          </div>
          <div className='flex justify-center text-xs md:hidden'>
            {item.transformationMobile
              ? item.transformationMobile(item.value)
              : item.transformation
              ? item.transformation(item.value)
              : item.value}
          </div>
        </td>
      ))}
    </tr>
  );
};

export default TableRow;

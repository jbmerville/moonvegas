import React, { ReactNode } from 'react';

interface Input<T> {
  value: T;
  transformation?: (value: T) => ReactNode;
  transformationMobile?: (value: T) => ReactNode;
}

interface TableRowProps<T> {
  inputs: Input<T>[];
  url?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableRow = (props: TableRowProps<any>) => {
  const { inputs, url } = props;

  return (
    <tr
      onClick={() => url && window.open(url, '_blank')}
      className={`${
        url && 'hover:cursor-pointer'
      } box-border border-b-[0.5px] border-[#474d57] text-center hover:bg-[#0c0e11]`}
    >
      {inputs.map((input, i) => (
        <td key={i} className='p-1 md:p-2 '>
          <div className='hidden justify-center md:flex'>
            {input.transformation ? input.transformation(input.value) : input.value}
          </div>
          <div className='flex justify-center md:hidden'>
            {input.transformationMobile
              ? input.transformationMobile(input.value)
              : input.transformation
              ? input.transformation(input.value)
              : input.value}
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

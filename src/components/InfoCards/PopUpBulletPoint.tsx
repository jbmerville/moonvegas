import React, { ReactNode } from 'react';

export interface PopUpBulletPointPropsType {
  children: ReactNode;
}

const PopUpBulletPoint = (props: PopUpBulletPointPropsType) => {
  const { children } = props;

  return (
    <li className='!my-5 flex items-center md:!my-6'>
      <svg
        className='mr-4 h-4 w-4 flex-shrink-0 text-moonbeam-cyan'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
          clipRule='evenodd'
        ></path>
      </svg>
      <span>{children}</span>
    </li>
  );
};

export default PopUpBulletPoint;

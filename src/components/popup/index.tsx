import React, { ReactNode } from 'react';

interface PopUpProps {
  children: ReactNode;
}

const PopUp = (props: PopUpProps) => {
  const { children } = props;
  return (
    <div className='h-modal fixed top-0 right-0 left-0 z-50 hidden overflow-y-auto overflow-x-hidden md:inset-0 md:h-full'>
      <div className='relative h-full w-full max-w-md p-4 md:h-auto'>
        <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
          <button
            type='button'
            className='absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
          >
            <svg
              className='h-5 w-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'></path>
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-6 text-center'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;

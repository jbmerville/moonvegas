import React, { ReactNode } from 'react';

interface PopUpProps {
  children: ReactNode;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const PopUp = (props: PopUpProps) => {
  const { children, isVisible, setIsVisible } = props;
  return (
    <div
      className={`animate fixed top-0 right-0 left-0 z-50 h-modal duration-300  ${
        isVisible ? 'z-10 opacity-100' : 'z-[-1] opacity-0'
      } flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-moonbeam-blue-dark/[.8] md:inset-0`}
    >
      <div className='relative h-fit w-fit max-w-md  p-4 md:h-auto'>
        <div
          className={`animate relative  h-fit w-fit list-inside list-disc space-y-1 rounded-lg border  border-white/20 bg-moonbeam-blue-dark text-gray-500 text-white/80 shadow-md shadow-black/50 duration-150 ${
            isVisible ? ' mt-10 block opacity-100' : 'm-0 block opacity-0'
          }`}
        >
          <button
            type='button'
            onClick={() => setIsVisible(false)}
            className='absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 '
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
          <div className='h-fit w-fit p-6'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;

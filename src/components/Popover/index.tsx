import React, { ReactNode, useState } from 'react';
interface PopOverProps {
  children: ReactNode;
  title: string;
  description: string;
}

const PopOver = (props: PopOverProps) => {
  const { children, title, description } = props;
  const [isHover, setIsHover] = useState(false);
  return (
    <div className='relative flex h-full w-full flex-col-reverse'>
      <div
        className={`${
          isHover ? 'opacity-100' : 'z-[-1] opacity-0'
        } absolute z-10 mb-[50px] inline-block w-full rounded-lg border border-gray-600 bg-gray-800  font-light  text-gray-400 shadow-sm transition-opacity duration-300`}
      >
        <div className='rounded-t-lg border-b border-gray-600 bg-gray-700 py-2 px-3'>
          <p className='text-sm font-semibold text-white'>{title}</p>
        </div>
        <div className='py-2 px-3 text-xs'>{description}</div>
        <div data-popper-arrow className='absolute left-1/2 bottom-[-5px]'></div>
      </div>
      <div
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PopOver;

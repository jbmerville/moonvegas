import React, { ReactNode } from 'react';

import Loading from '@/components/icons/Loading';

export interface InfoCardPropsType {
  title: ReactNode | string;
  subtitle: ReactNode | string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const InfoCard = (props: InfoCardPropsType) => {
  const { title, subtitle, className, onClick, isLoading } = props;

  return (
    <div
      onClick={onClick}
      className={`box-border flex min-h-[60px] grow flex-col items-center justify-around rounded-2xl border-2 border-transparent bg-moonbeam-grey-light py-2 text-white md:min-h-[120px] md:py-6 ${
        onClick ? 'cursor-pointer hover:border-moonbeam-cyan hover:bg-moonbeam-grey-dark hover:text-moonbeam-cyan' : ''
      } ${className}`}
    >
      {isLoading ? (
        <div className='md:scale-150'>
          <Loading />
        </div>
      ) : (
        <div className={`flex text-base font-bold uppercase text-white md:text-3xl ${onClick ? 'text-inherit' : ''}`}>
          {title}
        </div>
      )}
      <div className='text flex text-xs text-white opacity-75 md:text-base'>{subtitle}</div>
    </div>
  );
};

export default InfoCard;

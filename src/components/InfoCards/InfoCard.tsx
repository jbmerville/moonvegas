import React, { ReactNode } from 'react';

export interface InfoCardPropsType {
  title: ReactNode | string;
  subtitle: ReactNode | string;
  className?: string;
  onClick?: () => void;
}

const InfoCard = (props: InfoCardPropsType) => {
  const { title, subtitle, className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={`box-border flex grow flex-col items-center justify-center rounded-2xl border-2 border-transparent bg-moonbeam-grey-light py-2 text-white md:py-6 ${
        onClick ? 'cursor-pointer hover:border-moonbeam-cyan hover:bg-moonbeam-grey-dark hover:text-moonbeam-cyan' : ''
      } ${className}`}
    >
      <div className={`flex text-base font-bold uppercase text-white md:text-3xl ${onClick ? 'text-inherit' : ''}`}>
        {title}
      </div>
      <div className='text flex text-xs text-white opacity-75 md:text-base'>{subtitle}</div>
    </div>
  );
};

export default InfoCard;

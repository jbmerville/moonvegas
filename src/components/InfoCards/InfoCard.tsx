import React, { ReactNode } from 'react';

import Loading from '@/components/icons/Loading';

import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

export interface InfoCardPropsType {
  title: ReactNode | string;
  subtitle: ReactNode | string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const InfoCard = (props: InfoCardPropsType) => {
  const { title, subtitle, className, onClick, isLoading } = props;
  const { colorAccent } = useCurrentNetworkContext();
  const onClickClassName = `hover:text-${colorAccent} hover:border-${colorAccent} cursor-pointer hover:bg-moonbeam-grey-dark`;
  return (
    <div
      data-cy='info-card'
      onClick={onClick}
      className={`box-border flex min-h-[60px] grow flex-col items-center justify-around rounded-2xl border-2 border-transparent bg-moonbeam-grey-light py-2 text-white md:min-h-[120px] md:py-6 ${
        onClick ? onClickClassName : ''
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

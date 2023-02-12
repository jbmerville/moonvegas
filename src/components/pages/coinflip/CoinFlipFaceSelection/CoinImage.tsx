import { MoonbaseAlpha, Moonriver } from '@usedapp/core';
import Image from 'next/image';
import React from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

import coinHeads from '../../../../../public/images/coin-heads.png';
import coinHeadsMoonbaseAlpha from '../../../../../public/images/coin-heads-moonbase-alpha.png';
import coinHeadsMoonriver from '../../../../../public/images/coin-heads-moonriver.png';
import coinTails from '../../../../../public/images/coin-tails.png';
import coinTailsMoonbaseAlpha from '../../../../../public/images/coin-tails-moonbase-alpha.png';
import coinTailsMoonriver from '../../../../../public/images/coin-tails-moonriver.png';

import { CoinFace } from '@/types';

interface CoinImagePropsStyle {
  coinFace: CoinFace;
  height?: number;
  width?: number;
}

const CoinImage = (props: CoinImagePropsStyle) => {
  const isMobile = useIsMobile();
  const { coinFace, height, width } = props;
  const { currentNetwork } = useCurrentNetworkContext();
  const defaultImageSize = isMobile ? '80px' : '150px';
  const imageWidth = height || defaultImageSize;
  const imageHeight = width || defaultImageSize;

  if (coinFace === CoinFace.HEADS) {
    return (
      <Image
        src={getHeadsCoinFaceImage(currentNetwork.network.chainId)}
        layout='fixed'
        height={`${imageHeight}px`}
        width={`${imageWidth}px`}
        alt='Heads'
      />
    );
  }

  return (
    <Image
      src={getTailsCoinFaceImage(currentNetwork.network.chainId)}
      layout='fixed'
      height={`${imageHeight}px`}
      width={`${imageWidth}px`}
      alt='Tails'
    />
  );
};

function getHeadsCoinFaceImage(chaindId?: number) {
  if (chaindId === MoonbaseAlpha.chainId) {
    return coinHeadsMoonbaseAlpha;
  }
  if (chaindId === Moonriver.chainId) {
    return coinHeadsMoonriver;
  }
  return coinHeads;
}

function getTailsCoinFaceImage(chaindId?: number) {
  if (chaindId === MoonbaseAlpha.chainId) {
    return coinTailsMoonbaseAlpha;
  }
  if (chaindId === Moonriver.chainId) {
    return coinTailsMoonriver;
  }
  return coinTails;
}

export default CoinImage;

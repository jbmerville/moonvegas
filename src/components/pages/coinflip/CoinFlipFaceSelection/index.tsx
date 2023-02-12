import React from 'react';

import Coin from '@/components/pages/coinflip/CoinFlipFaceSelection/Coin';

import { CoinFace } from '@/types';

interface CoinFlipFaceSelectionPropsType {
  playerCoinFaceChoice: CoinFace;
  setPlayerCoinFaceChoice: (playerCoinFaceChoice: CoinFace) => void;
}
const CoinFlipFaceSelection = (props: CoinFlipFaceSelectionPropsType) => {
  const { playerCoinFaceChoice, setPlayerCoinFaceChoice } = props;

  return (
    <div className='layout flex flex-col items-center justify-center'>
      <div className='my-10 flex flex-row items-center justify-center md:my-24'>
        <Coin
          playerCoinFaceChoice={playerCoinFaceChoice}
          setPlayerCoinFaceChoice={setPlayerCoinFaceChoice}
          coinFace={CoinFace.HEADS}
        />
        <Coin
          playerCoinFaceChoice={playerCoinFaceChoice}
          setPlayerCoinFaceChoice={setPlayerCoinFaceChoice}
          coinFace={CoinFace.TAILS}
        />
      </div>
    </div>
  );
};

export default CoinFlipFaceSelection;

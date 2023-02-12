import React from 'react';

import Coin from '@/components/pages/coinflip/CoinFlipFaceSelection/Coin';
import CoinFlipping from '@/components/pages/coinflip/CoinFlipFaceSelection/CoinFlipping';

import { useCoinFlipContext } from '@/contexts/CoinFlipContext';

import { CoinFace } from '@/types';

interface CoinFlipFaceSelectionPropsType {
  playerCoinFaceChoice: CoinFace;
  setPlayerCoinFaceChoice: (playerCoinFaceChoice: CoinFace) => void;
}
const CoinFlipFaceSelection = (props: CoinFlipFaceSelectionPropsType) => {
  const { playerCoinFaceChoice, setPlayerCoinFaceChoice } = props;
  const { isTransactionPending } = useCoinFlipContext();

  return (
    <div className='layout flex flex-col items-center justify-center'>
      <div className='my-16 flex flex-row items-center justify-center md:my-24'>
        {isTransactionPending ? (
          <CoinFlipping />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default CoinFlipFaceSelection;

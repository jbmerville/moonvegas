import React from 'react';

import CoinFlipping from '@/components/pages/coinflip/CoinFlipFaceSelection/CoinFlipping';
import CoinSelectable from '@/components/pages/coinflip/CoinFlipFaceSelection/CoinSelectable';

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
      <div className='md:b-20 mb-3 mt-14 flex flex-row items-center justify-between md:mt-36'>
        {isTransactionPending ? (
          <CoinFlipping />
        ) : (
          <>
            <CoinSelectable
              playerCoinFaceChoice={playerCoinFaceChoice}
              setPlayerCoinFaceChoice={setPlayerCoinFaceChoice}
              coinFace={CoinFace.HEADS}
            />
            <CoinSelectable
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

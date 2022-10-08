pragma solidity ^0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';

contract CoinFlip is Ownable {
  struct Round {
    address payable player;
    uint256 betAmount;
    bool playerChoice; // true = heads; false = tails
    bool draw;
  }

  uint256 public roundId; // Current round number
  uint256 public totalVolume; // Total volume flipped
  uint16 public royalty; // Royalty to give to the owner account when funds are redistributed. Ex: 10 => 1%, 15 => 1.5%
  address payable[] players; // All the addresses that have flipped some tokens
  mapping(uint256 => Round) public flipHistory; // map the roundId with the round data
  mapping(address => Round[]) public playerFlipHistory; // map the address of player to its history of flips

  event Flip(Round round);

  constructor() {
    roundId = 0;
    royalty = 35; // 3.5%
  }

  /**
   * @param _royalty The new royalty amount
   */
  function setRoyalty(uint16 _royalty) public onlyOwner {
    require(_royalty <= 100, 'Royalty should be less than or equal to 100%');
    require(_royalty >= 0, 'Royalty should be greater than or equal to 0%');
    royalty = _royalty;
  }

  function flip(bool _playerChoice) external payable {
    // Minimum amount to bet
    require(msg.value > 0, 'Transaction value should be greater than 0');

    // Maximum amout to bet
    require(
      msg.value < (address(this).balance - msg.value) / 4,
      'Transaction value should be lesser than 1/4th of the contracts balance'
    );

    // update states
    players.push(payable(msg.sender));
    totalVolume += msg.value;
    roundId = roundId + 1;

    bool draw = getRandomFlip();

    // Fees
    uint256 feesAmount = payOwner(msg.value);

    Round memory round = Round(payable(msg.sender), msg.value, _playerChoice, draw);
    flipHistory[roundId] = round;
    playerFlipHistory[msg.sender].push(round);

    // Winner rewards
    if (draw == _playerChoice) {
      uint256 winnerCut = msg.value + (msg.value - feesAmount);
      payable(msg.sender).transfer(winnerCut);
    }

    emit Flip(round);
  }

  function payOwner(uint256 _betAmount) private returns (uint256) {
    uint256 feesAmount = (_betAmount * royalty) / 1000;
    payable(owner()).transfer(feesAmount);
    return feesAmount;
  }

  function loadFunds() external payable onlyOwner {}

  function getRandomFlip() private view returns (bool) {
    return
      uint256(
        keccak256(
          abi.encodePacked(
            msg.sender,
            block.coinbase,
            block.difficulty,
            block.gaslimit,
            block.timestamp
          )
        )
      ) %
        2 ==
      1;
  }
}

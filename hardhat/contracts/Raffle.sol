pragma solidity ^0.8.9;

// Import this file to use console.log
import 'hardhat/console.sol';

contract Raffle {
  uint256 public unlockTime;
  uint256 public ticketAmount;
  address payable public owner;
  mapping(uint256 => address) public tickets;

  event Purchased(address indexed account, uint256 amount);

  constructor(uint256 _unlockTime, uint256 _ticketAmount) payable {
    require(
      block.timestamp < _unlockTime,
      'Unlock time should be in the future'
    );
    require(_ticketAmount > 0, 'Ticket amount should be greater than 0');

    unlockTime = _unlockTime;
    ticketAmount = _ticketAmount;
    owner = payable(msg.sender);
  }

  /**
   * @param _ticketIds Array containing the ids of ticket to purchase
   */
  function purchase(uint256[] memory _ticketIds) external payable {
    // Uncomment this line to print a log in your terminal
    // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
    require(block.timestamp >= unlockTime, "You can't withdraw yet");
    for (uint256 i = 0; i < _ticketIds.length; i++) {
      require(
        _ticketIds[i] > 0 && _ticketIds[i] <= ticketAmount,
        'Ticket id should be between 1 and max ticket supply'
      );
      require(
        tickets[_ticketIds[i]] != address(0),
        'Ticket should not be purchased already'
      );
      tickets[_ticketIds[i]] = msg.sender;
    }

    emit Purchased(address(this), _ticketIds.length);
  }
}

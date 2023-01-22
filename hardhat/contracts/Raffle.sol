// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import 'hardhat/console.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Raffle is Ownable {
  struct RaffleHistory {
    address winner;
    uint256 winningTicket;
    uint256 ticketAmount;
  }

  struct TicketBought {
    address owner;
    uint256 ticketId;
  }

  uint256 public draftTime; // When the draft ends
  uint256 public maxTicketAmount; // Max amount of tickets in the current raffle
  uint256 public nextRaffleMaxTicketAmount; // Max amount of tickets in the next raffle
  uint256 public currTicketAmount; // Current amount of tickets sold in the current raffle
  uint16 public royalty; // Royalty to give to the owner account when funds are redistributed. Ex: 10 => 1%, 15 => 1.5%
  uint256 public ticketPrice; // Ticket price of the current raffle
  uint256 public nextRaffleTicketPrice; // Ticket price of the next raffle
  address[] currentPlayers; // All the addresses of the players of the current raffle
  mapping(uint256 => address payable) public ticketsOwner; // Mapping of ticketId to address that bought this ticket
  mapping(address => uint256[]) public ticketsBoughtByPlayer; // Mapping of address to all the tickets bought by this address
  RaffleHistory[] public rafflesHistoy; // History of all the previous raffles excluding the current one
  TicketBought[] public ticketsBought; // All the ticketIds that have been bought already
  bool public raffleEnd; // Whether the raffle has ended or not.

  event PurchasedTickets(address player, uint256[] ticketsBought);
  event RaffleEnd(address winner, uint256 winningTicket, uint256 ticketAmount);

  constructor(
    uint256 _draftTime,
    uint256 _maxTicketAmount,
    uint256 _ticketPrice
  ) payable {
    require(block.timestamp < _draftTime, 'Draft end time should be in the future');
    require(_maxTicketAmount > 0, 'Max ticket amount should be greater than 0');
    require(_ticketPrice > 0, 'Ticket price should be greater than 0');

    draftTime = _draftTime;
    maxTicketAmount = _maxTicketAmount;
    nextRaffleMaxTicketAmount = _maxTicketAmount + 1;
    ticketPrice = _ticketPrice;
    nextRaffleTicketPrice = _ticketPrice;
    royalty = 50; // 5%
  }

  /**
   * @param _royalty The new royalty amount
   */
  function setRoyalty(uint16 _royalty) external onlyOwner {
    require(_royalty >= 0, 'Royalty should be greater than or equal to 0%');
    require(_royalty <= 1000, 'Royalty should be less than or equal to 100%');

    royalty = _royalty;
  }

  /**
   * @param _nextRaffleTicketPrice The max amount of tickets in the next raffle
   */
  function setNextRaffleTicketPrice(uint256 _nextRaffleTicketPrice) external onlyOwner {
    require(
      _nextRaffleTicketPrice >= 0,
      'Next raffle ticket price must be greater than or equal to 0'
    );

    nextRaffleTicketPrice = _nextRaffleTicketPrice;
  }

  /**
   * @param _nextRaffleMaxTicketAmount The ticket price of the next raffle
   */
  function setNextRaffleMaxTicketAmount(uint256 _nextRaffleMaxTicketAmount) external onlyOwner {
    require(_nextRaffleMaxTicketAmount > 0, 'Next raffle max ticket amount must be greater than 0');

    nextRaffleMaxTicketAmount = _nextRaffleMaxTicketAmount;
  }

  /**
   * @param _ticketIds Array containing the ids of ticket to be purchased
   */
  function purchase(uint256[] memory _ticketIds) external payable {
    // require(block.timestamp <= draftTime, "Can't buy ticket after raffle draft time has passed");
    require(!raffleEnd, "Raffle has ended, can't buy ticket");
    require(
      _ticketIds.length * ticketPrice == msg.value,
      'Transaction value should match ticket price and number of tickets to be bought'
    );
    for (uint256 i = 0; i < _ticketIds.length; i++) {
      require(_ticketIds[i] > 0 && _ticketIds[i] <= maxTicketAmount, 'Invalid ticketId');
      require(ticketsOwner[_ticketIds[i]] == address(0), 'Ticket already sold');
    }

    for (uint256 i = 0; i < _ticketIds.length; i++) {
      ticketsOwner[_ticketIds[i]] = payable(msg.sender);
      currTicketAmount++;
      ticketsBought.push(TicketBought({owner: msg.sender, ticketId: _ticketIds[i]})); // TODO add test to verify that this is populated properly
      ticketsBoughtByPlayer[msg.sender].push(_ticketIds[i]);
    }

    currentPlayers.push(msg.sender);

    emit PurchasedTickets(msg.sender, _ticketIds);
    if (currTicketAmount == maxTicketAmount) {
      endRaffle();
    }
  }

  function endRaffle() private {
    raffleEnd = true;
    uint256 winningTicketId = getRandomTicketId();
    address payable winner = payable(ticketsBought[winningTicketId].owner);
    uint256 balance = address(this).balance;

    // Fees
    uint256 feesAmount = payOwner();

    // Winner rewards
    uint256 winnerCut = balance - feesAmount;
    winner.transfer(winnerCut);

    resetRaffle(RaffleHistory(winner, winningTicketId, maxTicketAmount));
    emit RaffleEnd(winner, winningTicketId, maxTicketAmount);
  }

  function payOwner() private returns (uint256) {
    uint256 balance = address(this).balance;
    uint256 feesAmount = (balance * royalty) / 1000;
    payable(owner()).transfer(feesAmount);
    return feesAmount;
  }

  function resetRaffle(RaffleHistory memory raffleHistoy) private {
    raffleEnd = false;
    maxTicketAmount = nextRaffleMaxTicketAmount;
    nextRaffleMaxTicketAmount = nextRaffleMaxTicketAmount + 1;
    ticketPrice = nextRaffleTicketPrice;
    currTicketAmount = 0;
    rafflesHistoy.push(raffleHistoy);

    for (uint256 i = 0; i < ticketsBought.length; i++) {
      delete ticketsOwner[ticketsBought[i].ticketId];
    }
    delete ticketsBought;

    for (uint256 i = 0; i < currentPlayers.length; i++) {
      delete ticketsBoughtByPlayer[currentPlayers[i]];
    }
    delete currentPlayers;
  }

  function getRandomTicketId() private view returns (uint256) {
    return
      ((
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
        )
      ) % ticketsBought.length) + 1;
  }

  function getTicketsBought() public view returns (TicketBought[] memory) {
    return ticketsBought;
  }
}

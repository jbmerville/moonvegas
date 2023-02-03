// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import 'hardhat/console.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Raffle is Ownable {
  struct RaffleHistory {
    address winner;
    uint256 winningTicket;
    uint256 totalTickets;
    uint256 ticketPrice;
  }

  struct TicketBought {
    address owner;
    uint256 ticketId;
  }

  // ========== State variables ======
  uint256 public draftTime; // When the draft ends
  uint256 public nextDraftDuration; // The next draft duration in seconds
  uint256 public maxTicketAmount; // Max amount of tickets in the current raffle
  uint256 public nextRaffleMaxTicketAmount; // Max amount of tickets in the next raffle
  uint256 public currTicketAmount; // Current amount of tickets sold in the current raffle
  uint16 public royalty; // Royalty to give to the owner account when funds are redistributed. Ex: 10 => 1%, 15 => 1.5%
  uint256 public ticketPrice; // Ticket price of the current raffle
  uint256 public nextRaffleTicketPrice; // Ticket price of the next raffle
  address[] currentPlayers; // All the addresses of the players of the current raffle
  mapping(uint256 => address payable) public ticketsOwner; // Mapping of ticketId to address that bought this ticket
  mapping(address => uint256[]) public ticketsBoughtByPlayer; // Mapping of address to all the tickets bought by this address
  RaffleHistory[] public raffleHistory; // History of all the previous raffles excluding the current one
  TicketBought[] public ticketsBought; // All the ticketIds that have been bought already
  bool public raffleEnd; // Whether the raffle has ended or not.

  // ========== Events ===============
  event PurchasedTickets(address player, uint256[] ticketsBought);
  event RaffleEnd(address winner, uint256 winningTicket, uint256 ticketAmount);

  // ========== Constructor ==========
  constructor(
    uint256 _draftTime,
    uint256 _maxTicketAmount,
    uint256 _ticketPrice
  ) payable {
    require(block.timestamp < _draftTime, 'Draft end time should be in the future');

    draftTime = _draftTime;
    maxTicketAmount = _maxTicketAmount;

    uint256 oneWeekInSeconds = 7 * 24 * 60 * 60;
    nextDraftDuration = oneWeekInSeconds;

    nextRaffleMaxTicketAmount = _maxTicketAmount + 1;
    ticketPrice = _ticketPrice;
    nextRaffleTicketPrice = _ticketPrice;
    royalty = 50; // 5%
  }

  // ========== Owner Functions =====
  /**
   * @param _royalty The new royalty amount
   */
  function setRoyalty(uint16 _royalty) external onlyOwner {
    require(_royalty <= 1000, 'Royalty should be less than or equal to 1000');

    royalty = _royalty;
  }

  /**
   * @param _nextRaffleTicketPrice The max amount of tickets in the next raffle
   */
  function setNextRaffleTicketPrice(uint256 _nextRaffleTicketPrice) external onlyOwner {
    nextRaffleTicketPrice = _nextRaffleTicketPrice;
  }

  /**
   * @param _nextRaffleMaxTicketAmount The ticket price of the next raffle
   */
  function setNextRaffleMaxTicketAmount(uint256 _nextRaffleMaxTicketAmount) external onlyOwner {
    nextRaffleMaxTicketAmount = _nextRaffleMaxTicketAmount;
  }

  /**
   * @param _nextDraftDuration The duration of the next draft in seconds
   */
  function setNextDraftDuration(uint256 _nextDraftDuration) external onlyOwner {
    nextDraftDuration = _nextDraftDuration;
  }

  /**
   * @param _currentDraftDurationFromNow The duration of the current draft in milliseconds, from the moment of the transaction
   */
  function resetCurrentDraftDurationFromNow(uint256 _currentDraftDurationFromNow) external onlyOwner {
    draftTime = block.timestamp + _currentDraftDurationFromNow;
  }

  // ========== Public Functions ====
  /**
   * @param _ticketIds Array containing the ids of ticket to be purchased
   */
  function purchase(uint256[] memory _ticketIds) external payable {
    require(block.timestamp <= draftTime, "Can't buy ticket after raffle draft time has passed");
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

  // ========== Private Functions ====
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

    resetRaffle(RaffleHistory(winner, winningTicketId, maxTicketAmount, ticketPrice));
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
    draftTime = block.timestamp + nextDraftDuration;
    raffleHistory.push(raffleHistoy);

    for (uint256 i = 0; i < ticketsBought.length; i++) {
      delete ticketsOwner[ticketsBought[i].ticketId];
    }
    delete ticketsBought;

    for (uint256 i = 0; i < currentPlayers.length; i++) {
      delete ticketsBoughtByPlayer[currentPlayers[i]];
    }
    delete currentPlayers;
  }

  // ========== View =================
  function getRandomTicketId() private view returns (uint256) {
    return
      ((
        uint256(
          keccak256(abi.encodePacked(msg.sender, block.coinbase, block.difficulty, block.gaslimit, block.timestamp))
        )
      ) % ticketsBought.length) + 1;
  }

  function getTicketsBought() public view returns (TicketBought[] memory) {
    return ticketsBought;
  }

  function getRaffleHistory() public view returns (RaffleHistory[] memory) {
    return raffleHistory;
  }
}

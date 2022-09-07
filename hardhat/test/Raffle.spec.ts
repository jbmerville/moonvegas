import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

import { Raffle } from '../types';

describe('Raffle', function () {
  const PRICE = ethers.utils.parseEther('20');
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployRaffleFixture() {
    const ONE_GWEI = 1_000_000_000;

    const draftTime = (await time.latest()) + ONE_YEAR_IN_SECS;
    const maxTicketAmount = 100;
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Raffle = await ethers.getContractFactory('Raffle');
    const raffle = await Raffle.deploy(draftTime, maxTicketAmount, PRICE);
    return { raffle, draftTime, owner, otherAccount, maxTicketAmount };
  }

  describe('Deployment', function () {
    it('Should set the right unlockTime', async function () {
      // Arrange
      const { raffle, maxTicketAmount } = await loadFixture(deployRaffleFixture);

      // Act
      const actual = await raffle.maxTicketAmount();

      // Assert
      expect(actual).to.equal(maxTicketAmount);
    });

    it('Should set the right owner', async function () {
      // Arrange
      const { raffle, owner } = await loadFixture(deployRaffleFixture);

      // Act
      const actual = await raffle.owner();

      // Assert
      expect(actual).to.equal(owner.address);
    });

    it('Should set the right unlockTime', async function () {
      // Arrange
      const { raffle, draftTime } = await loadFixture(deployRaffleFixture);

      // Act
      const actual = await raffle.draftTime();

      // Assert
      expect(actual).to.equal(draftTime);
    });

    it('Should fail if the unlockTime is not in the future', async function () {
      // Arrange
      const latestTime = await time.latest();
      const raffle = await ethers.getContractFactory('Raffle');

      // Act
      const actual = raffle.deploy(latestTime, 1000, PRICE);

      // Assert
      await expect(actual).to.be.revertedWith('Draft end time should be in the future');
    });
  });

  describe('Purchases', function () {
    describe('Validations', function () {
      it('Should revert if transaction is after the draft is completed', async function () {
        // Arrange
        const { raffle, draftTime } = await loadFixture(deployRaffleFixture);
        await ethers.provider.send('evm_mine', [draftTime + 60]);

        // Act
        const actual = raffle.purchase([1, 2, 3], { value: PRICE });

        // Assert
        await expect(actual).to.be.revertedWith(
          "Can't buy ticket after raffle is draft time is passed"
        );
      });

      it('Should revert if ticket id is not valid', async function () {
        // Arrange
        const { raffle, maxTicketAmount } = await loadFixture(deployRaffleFixture);

        // Act
        const actual = raffle.purchase([1, 2, 3, maxTicketAmount + 1], {
          value: PRICE.mul(BigNumber.from(4)),
        });

        // Assert
        await expect(actual).to.be.revertedWith(
          'Ticket id should be between 1 and max ticket supply'
        );
      });

      it('Should revert if transaction value does not match ticket price and number of tickets to be bought', async function () {
        // Arrange
        const { raffle } = await loadFixture(deployRaffleFixture);

        // Act
        const actual = raffle.purchase([1, 2, 3], { value: PRICE });

        // Assert
        await expect(actual).to.be.revertedWith(
          'Transaction value should match ticket price and number of tickets to be bought'
        );
      });

      it('Should revert if ticket is already bought', async function () {
        // Arrange
        const { raffle } = await loadFixture(deployRaffleFixture);
        raffle.purchase([1], { value: PRICE });

        // Act
        const actual = raffle.purchase([1], { value: PRICE });

        // Assert
        await expect(actual).to.be.revertedWith('Ticket should not be purchased already');
      });

      it('Should be in a valid state after valid transactions', async function () {
        // Arrange 1
        const { raffle } = await loadFixture(deployRaffleFixture);
        const ticketIds1 = [1];
        const account1 = (await ethers.getSigners())[1];
        const address1 = account1.address;

        // Act 1
        await raffle.connect(account1).purchase(ticketIds1, { value: PRICE });

        // Assert 1
        await expect(await ethers.provider.getBalance(raffle.address)).to.equal(PRICE);
        await checkPlayerBoughtTickets(address1, ticketIds1, raffle);
        await checkTicketsAddress(address1, ticketIds1, raffle);
        expect(await raffle.currTicketAmount()).to.equal(1);

        // Arrange 2
        const ticketIds2 = [2, 3, 4, 5];
        const priceFourTickets = PRICE.mul(BigNumber.from(4));
        const account2 = (await ethers.getSigners())[2];
        const address2 = account2.address;

        // Act 2
        await raffle.connect(account2).purchase(ticketIds2, { value: priceFourTickets });

        // Assert 2
        await expect(await ethers.provider.getBalance(raffle.address)).to.equal(
          PRICE.add(priceFourTickets)
        );
        await checkPlayerBoughtTickets(address2, ticketIds2, raffle);
        await checkTicketsAddress(address2, ticketIds2, raffle);
        expect(await raffle.currTicketAmount()).to.equal(5);
      });

      it('Should successfully transfer funds to winner and owner when the draft is completed', async function () {
        // Arrange
        const Raffle = await ethers.getContractFactory('Raffle');
        const ticketAmount = 20;
        const ticketIds = new Array(ticketAmount).fill(0).map((_, i) => i + 1);
        const totalPrice = PRICE.mul(ticketAmount);
        const raffleCut = totalPrice.mul(50).div(1000);
        const winnerCut = totalPrice.sub(raffleCut);
        const account1 = (await ethers.getSigners())[1];
        const account2 = (await ethers.getSigners())[2];
        const account3 = (await ethers.getSigners())[3];
        const raffle = await Raffle.connect(account1).deploy(
          (await time.latest()) + ONE_YEAR_IN_SECS,
          ticketAmount,
          PRICE
        );

        // Act
        await raffle
          .connect(account2)
          .purchase(ticketIds.slice(1), { value: PRICE.mul(ticketAmount - 1) });
        const account1Balance = await ethers.provider.getBalance(account1.address);
        const account2Balance = await ethers.provider.getBalance(account2.address);
        await raffle.connect(account3).purchase([1], { value: PRICE });

        // Assert
        expect(await ethers.provider.getBalance(account1.address)).to.eql(
          account1Balance.add(raffleCut)
        );
        expect(await ethers.provider.getBalance(account2.address)).to.eql(
          account2Balance.add(winnerCut)
        );

        // await checkPlayerBoughtTickets(address1, ticketIds1, raffle);
        // await checkTicketsAddress(address1, ticketIds1, raffle);
        expect(await raffle.currTicketAmount()).to.equal(0);
      });
    });

    describe('Events', function () {
      it('Should emit an event on purchase', async function () {
        // Arrange
        const { raffle } = await loadFixture(deployRaffleFixture);
        const ticketIds = [1];

        // Act + Assert
        await expect(raffle.purchase(ticketIds, { value: PRICE }))
          .to.emit(raffle, 'PurchasedTickets')
          .withArgs('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', ticketIds);
      });
    });
  });
});

function checkTicketsAddress(address: string, ticketIds: number[], raffle: Raffle) {
  return Promise.all(
    ticketIds.map(
      async (ticketId) => await expect(await raffle.ticketsOwner(ticketId)).to.eql(address)
    )
  );
}

function checkPlayerBoughtTickets(address: string, ticketIds: number[], raffle: Raffle) {
  return Promise.all(
    ticketIds.map(
      async (ticketId, i) =>
        await expect(await raffle.ticketsBoughtByPlayer(address, i)).to.eql(
          BigNumber.from(ticketId)
        )
    )
  );
}

import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Raffle', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearRaffleFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
    const ticketAmount = 100;
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Raffle = await ethers.getContractFactory('Raffle');
    const raffle = await Raffle.deploy(unlockTime, ticketAmount);
    return { raffle, unlockTime, owner, otherAccount, ticketAmount };
  }

  describe('Deployment', function () {
    it('Should set the right unlockTime', async function () {
      const { raffle, ticketAmount } = await loadFixture(
        deployOneYearRaffleFixture
      );

      expect(await raffle.ticketAmount()).to.equal(ticketAmount);
    });

    it('Should set the right owner', async function () {
      const { raffle, owner } = await loadFixture(deployOneYearRaffleFixture);

      expect(await raffle.owner()).to.equal(owner.address);
    });

    it('Should set the right unlockTime', async function () {
      const { raffle, unlockTime } = await loadFixture(
        deployOneYearRaffleFixture
      );

      expect(await raffle.unlockTime()).to.equal(unlockTime);
    });

    it('Should fail if the unlockTime is not in the future', async function () {
      // We don't use the fixture here because we want a different deployment
      const latestTime = await time.latest();
      const raffle = await ethers.getContractFactory('Raffle');
      await expect(raffle.deploy(latestTime, 1000)).to.be.revertedWith(
        'Unlock time should be in the future'
      );
    });
  });
});

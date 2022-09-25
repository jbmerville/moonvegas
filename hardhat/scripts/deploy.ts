import fs from 'fs';
import { ethers } from 'hardhat';
import { task } from 'hardhat/config';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

async function deployRaffle() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_DAY_IN_SECS = 24 * 60 * 60;
  const ONE_WEEK_IN_SECS = 7 * ONE_DAY_IN_SECS;

  const draftTime = currentTimestampInSeconds + ONE_WEEK_IN_SECS;
  const ticketPrice = '0.01';
  const maxTicketAmount = 10;

  const Raffle = await ethers.getContractFactory('Raffle');
  const raffle = await Raffle.deploy(
    draftTime,
    maxTicketAmount,
    ethers.utils.parseEther(ticketPrice)
  );

  await raffle.deployed();

  await raffle.purchase([1, 3], { value: ethers.utils.parseEther(ticketPrice).mul(2) });

  fs.writeFileSync('Raffle.address.js', `module.exports = '${raffle.address}';`);
  console.log(
    `Raffle with ${maxTicketAmount} ticket at ${ticketPrice} GLMR and draft time ${new Date(
      draftTime * 1000
    ).toUTCString()} deployed to ${raffle.address}`
  );
}

async function deployCoinFlip() {
  const CoinFlip = await ethers.getContractFactory('CoinFlip');
  const coinFlip = await CoinFlip.deploy();

  await coinFlip.deployed();

  await coinFlip.loadFunds({ value: ethers.utils.parseEther('20') });

  fs.writeFileSync('CoinFlip.address.js', `module.exports = '${coinFlip.address}';`);
  console.log(`CoinFlip deployed to ${coinFlip.address}`);
}

async function main() {
  await deployRaffle();
  await deployCoinFlip();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

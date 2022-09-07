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

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_DAY_IN_SECS = 24 * 60 * 60;
  const ONE_WEEK_IN_SECS = 7 * ONE_DAY_IN_SECS;

  const draftTime = currentTimestampInSeconds + ONE_WEEK_IN_SECS;
  const ticketPrice = '0.0001';
  const maxTicketAmount = 100;

  const Raffle = await ethers.getContractFactory('Raffle');
  const raffle = await Raffle.deploy(
    draftTime,
    maxTicketAmount,
    ethers.utils.parseEther(ticketPrice)
  );

  await raffle.deployed();

  await raffle.purchase([1, 3], { value: ethers.utils.parseEther(ticketPrice).mul(2) });

  // TODO: write address to hardhat/artifacts/contracts/Raffle.sol/Raffle.json when deploying on localhost

  console.log(
    `Raffle with ${maxTicketAmount} ticket at ${ticketPrice} GLMR and draft time ${new Date(
      draftTime * 1000
    ).toUTCString()} deployed to ${raffle.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

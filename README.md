<img src="public/images/moonvegas-logo.png" width="220" title="hover text"/>

# What is MoonVegas?

MoonVegas is a platform to play the following games:

- **Raffle**: buy one or more tickets, when all tickets are sold a random ticket is picked at random and all the funds accumulated get transfered to the winner. The raffle then resets itself automatically. [View game](https://www.moonvegas.app/).
- **Coin flip**: pick either heads or tail, select a bet amount. A coin is flipped at random, if the outcome is the one you picked you get double your bet, otherwise the smart contract keeps it. [View game](https://www.moonvegas.app/coinflip).

It is build using Solidity (smart contract as backend) and React + NextJS (frontend).

# Developer guide

## Setup Environment Variables

First setup the `.env` file. Use the `.env.example` as a reference.

You will also need an account with tokens to make transactions on the network you are connected to (deploy smartcontract, interact with them).

1. Create a `secrets.json` in the `hardhat` directory.
1. Find your private key from Metamask. If you don't know how to find them, follow [this guide](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key#:~:text=On%20the%20account%20page%2C%20click,click%20%E2%80%9CConfirm%E2%80%9D%20to%20proceed.).
1. Add your private key to the `secrets.json` file you just created (use the `hardhat/secrets.example.json` as an example).

## Setup SmartContract development environment (MacOS)

There are 2 ways to deploy the smart contracts, either you can **run a node locally** or you can **use a testnet**, like Moonbeam's testnet Moonbase Alpha.

> **Warning**: The smart contracts tests are a bit flaky (fails ~1/10 times). This is due to the randomness of the games. If they fail, it will most likely work on a second try.

<details>
<summary>Locally</summary>

First set the environment variable `NEXT_PUBLIC_ENV` to `localhost` in the `.env` you created above, to target the local node.

Then, we need to use [Docker](https://docs.docker.com/desktop/install/mac-install/). Once docker is installed, we can setup a Moonbeam node locally with the following commands:

```bash
docker pull purestake/moonbeam:v0.25.0 # Download Moonbeam docker image (only run this command the first time)
docker run --rm --name moonbeam_development -p 9944:9944 -p 9933:9933 purestake/moonbeam:v0.25.0 --dev --ws-external --rpc-external # Run the node
```

Once the node is running, deploy the smart contracts to that node:

```bash
cd hardhat # All the smart contracts files are located in the ./hardhat directory
yarn install # Install dependencies
yarn run compile # Compile the smart contracts anytime you modify them, this also runs the tests
yarn run deploy:localhost --raffleticketprice 1 --coinflippoolamount 5 # Deploy the compiled Smart Contracts to the node running locally
```

</details>

<details>
<summary>Testnet (Moonbase Alpha)</summary>

First set the environment variable `NEXT_PUBLIC_ENV` to `development` in the `.env` you created above, to target the testnet.

Then, deploy the smart contracts to testnet:

```bash
cd hardhat # All the smart contracts files are located in the ./hardhat directory
yarn install # Install dependencies
yarn run compile # Compile the smart contracts anytime you modify them, this also runs the tests
yarn run deploy:moonbase --raffleticketprice 1 --coinflippoolamount 5 # Deploy the compiled Smart Contracts to the node running locally
```

</details>

## Setup Frontend development environment

Run the development server:

```bash
yarn install # Install dependencies
yarn dev # Run front-end locally
```

Open http://localhost:3000 with your browser to see the result.

## FAQ

<details>

<summary> How to get localhost tokens?</summary>

If you are working on the localhost environment and running your own node locally (ref: _Setup SmartContract development environment (MacOS)_ section), you can get accounts with preloaded tokens by using any of the [Pre-funded Development Accounts from the Moonbeam doc](https://docs.moonbeam.network/builders/get-started/networks/moonbeam-dev/#pre-funded-development-accounts). Simply add one of the private keys to your MetaMask.

</details>

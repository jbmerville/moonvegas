<img src="public/images/moonvegas-logo.png" width="220" title="hover text"/>

# Frontend + SmartContracts for raffle and coinflip on [Moonbeam](https://moonbeam.network/).

## Setup SmartContract development environment (MacOS)

First we need to setup a Moonbeam node locally using [Docker](https://docs.docker.com/desktop/install/mac-install/):

```bash
docker pull purestake/moonbeam:v0.25.0 # Download Moonbeam docker image (only run this command the first time)
docker run --rm --name moonbeam_development -p 9944:9944 -p 9933:9933 purestake/moonbeam:v0.25.0 --dev --ws-external --rpc-external # Run the node
```

Once the node is running, deploy the SmartContracts to that node:

```bash
cd hardhat # All the SmartContracts files are located in the ./hardhat directory
yarn install # Install dependencies
yarn run compile # Compile the SmartContracts anytime you make changes
yarn run deploy:localhost # Deploy the compiled SmartContracts to the node running locally
```

You will also need an account with tokens to make transactions, to do so you can use any of the [Pre-funded Development Accounts](https://docs.moonbeam.network/builders/get-started/networks/moonbeam-dev/#pre-funded-development-accounts). Simply add one of the private keys to your MetaMask. For example:

```
0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133
```

## Setup Frontend development environment

Run the development server:

```bash
yarn install # Install dependencies
yarn dev # Run front-end locally
```

Open http://localhost:3000 with your browser to see the result.

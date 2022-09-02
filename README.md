# Moonbeam Raffle

Front end + SmartConract for raffle on [Moonbeam](https://moonbeam.network/).

## Setup SmartContract development environment (MacOS)

First we need to setup a Moonbeam node locally using [Docker](https://docs.docker.com/desktop/install/mac-install/):

```bash
docker pull purestake/moonbeam:v0.25.0 # Download Moonbeam docker image (only run this command the first time)
docker run --rm --name moonbeam_development -p 9944:9944 -p 9933:9933 purestake/moonbeam:v0.25.0 --dev --ws-external --rpc-external # Run the node
```

Once the node is running you can deploy the SmartContracts to that node:

```bash
cd hardhat # All the SmartContracts files are located in the ./hardhat directory
yarn install # Install dependencies
yarn run compile # Compile the SmartContracts anytime you make changes
yarn run deploy:localhost # Deploy the compiled SmartContracts to the node running locally
```

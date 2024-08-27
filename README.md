# Historical wallet balances

Currently only in Ethereum mainnet.

## Requires

- Install Bun: https://bun.sh/docs/installation

  - OSX Install: `curl -fsSL https://bun.sh/install | bash`

## Install

- clone locally: `git clone git@github.com:AoDev/moralis-wallet-history.git`

- go to folder

- Copy the `.env.sample` to a `.env` file in the folder of the script.

- Modify the .env file to put your Moralis API key.

## Usage

- In the folder of the script
- Write `bun run index.ts <wallet> <date>`

Replace wallet and date by what you need. eg:

`bun run index.ts 0xdC79FFB2042DcCAC85a4f79979F8ECdC9cECE984 2024-05-15`

## Info

The _date_ is translated to a block number. There are many blocks per day and the balances may have change during the day. Use a precise date time if needed.

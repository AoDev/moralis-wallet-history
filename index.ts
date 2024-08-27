import Moralis from 'moralis'
import {EvmChain} from '@moralisweb3/common-evm-utils'

const apiKey = process.env.MORALIS_KEY
const wallet = process.argv[2]
const date = process.argv[3]

if (!apiKey) {
  console.error('Please provide MORALIS_KEY in process.env.MORALIS_KEY')
  process.exit(1)
}

if (!wallet) {
  console.error('Please provide a wallet address as an argument.')
}

if (!date) {
  console.error('Please provide a date as an argument.')
}

if (!wallet || !date) {
  console.log('Usage: bun run index.ts <wallet> <date>')
  process.exit(1)
}

async function getBlockFromDate(date: string) {
  const response = await Moralis.EvmApi.block.getDateToBlock({
    chain: EvmChain.ETHEREUM,
    date,
  })
  return response.raw.block
}

// The main function to run the script
const runApp = async (): Promise<void> => {
  await Moralis.start({apiKey})

  const chain: EvmChain = EvmChain.ETHEREUM
  const toBlock = await getBlockFromDate(date)

  console.log('Block from date: ', toBlock)

  try {
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: wallet,
      chain,
      toBlock,
    })
    const tokens = response.raw
      .filter((token) => !token.possible_spam)
      .map((token) => {
        const balance = Number(token.balance) / Math.pow(10, token.decimals)
        return {symbol: token.symbol, name: token.name, balance}
      })

    console.log('Token Balances at Block:', toBlock)
    console.log(JSON.stringify(tokens, null, 2))
  } catch (error) {
    console.error('Error fetching token balances:', error)
  }
}

runApp()

require('dotenv').config();
const { ethers } = require('ethers');
const axios = require('axios');
const { TwitterApi } = require('twitter-api-v2');

// Set up Ethers.js provider with Alchemy
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
const contractAddress = process.env.CONTRACT_ADDRESS;

// Set up Twitter API client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Function to fetch token price from CoinGecko
async function getTokenPrice() {
  const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=pepecoin&vs_currencies=usd'); // Replace 'your-token-id' with the token's ID on CoinGecko
  return response.data['pepecoin'].usd;
}

// Listen for Transfer events from the ERC20 token contract
async function monitorTransactions() {
  const abi = [
    "event Transfer(address indexed from, address indexed to, uint256 value)"
  ];
  const contract = new ethers.Contract(contractAddress, abi, provider);

  contract.on("Transfer", async (from, to, value) => {
    console.log(`New transaction from ${from} to ${to}, value: ${value}`);

    // Fetch the current token price
    const tokenPrice = await getTokenPrice();
    const transferAmount = ethers.formatUnits(value, 18); // Adjust decimals based on the token

    const transferInUsd = transferAmount * tokenPrice;
    console.log(`Transfer value in USD: $${transferInUsd}`);

    if (transferInUsd >= 2000) {
      // Send a tweet if the transfer is over $2000
      const tweetResponse = await twitterClient.v2.tweet(`Large Transfer Alert! ${transferAmount} tokens (worth $${transferInUsd}) moved from ${from} to ${to}`);
      console.log("Tweet sent!", tweetResponse); // Log the response from Twitter
    }
  });
}

// Function to test sending a simple tweet
const testTweet = async () => {
  try {
    const response = await twitterClient.v2.tweet("This is a test tweet from my bot!");
    console.log("Test tweet sent!", response); // Log the response from Twitter
  } catch (error) {
    console.error("Error sending test tweet:", error);
  }
};

// Start monitoring transactions
monitorTransactions().catch(console.error);

// Uncomment this line to send a test tweet once when you run the bot
// testTweet();

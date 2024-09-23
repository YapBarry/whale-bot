# Whale Bot

A simple Twitter bot that monitors large transactions (buys and sells) of a specific Ethereum token and posts updates on Twitter.

## Features

- Monitors buy and sell transactions for the Ethereum token at address `0xa9e8acf069c58aec8825542845fd754e41a9489a`.
- Sends tweets when significant transactions occur.
- Utilizes CoinGecko API for price tracking.

## Tech Stack

- **Node.js**: JavaScript runtime for building the bot.
- **Ethers.js**: Library for interacting with the Ethereum blockchain.
- **Twitter API**: For sending tweets.
- **Axios**: For making HTTP requests to the CoinGecko API.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Twitter developer account with access to the Twitter API.
- An API key for CoinGecko.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/whale-bot.git
   cd whale-bot
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys:

   ```
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret
   TWITTER_ACCESS_TOKEN=your_twitter_access_token
   TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
   COINGECKO_API_KEY=your_coingecko_api_key
   ALCHEMY_API_URL=your_alchemy_api_url
   ```

### Running the Bot

To start the bot, run the following command:

```bash
node bot.js
```

### Notes

- Ensure that your bot complies with Twitter's rules and guidelines.
- Be mindful of rate limits when accessing the CoinGecko API.

## License

This project is licensed under the MIT License.

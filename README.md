# SwapX
A clean, fast token swap interface built on Starknet. powered by AVNU.


SwapX lets you swap STRK, ETH, USDC and USDT on Starknet directly from your browser. Connect your Argent X or Braavos wallet, enter an amount, and SwapX finds the best available rate through AVNU — Starknet's leading DEX aggregator — before sending the swap to your wallet for signing.
No seed phrases. No custodial accounts. Your wallet, your keys, your trade.


🌐 What Is Starknet?
Starknet is a Layer 2 network built on Ethereum. It uses zero-knowledge validity proofs to process thousands of transactions off-chain and verify them on Ethereum in a single proof — making transactions faster and cheaper than Ethereum mainnet while inheriting its security.

Gas fees on Starknet are paid in STRK, not ETH. This means you never need ETH in your wallet to use SwapX.

🔄 What Is AVNU?
AVNU is a decentralized exchange aggregator protocol on Starknet that routes your swap across all available liquidity sources to find the best rate. AVNU is the leading DEX aggregator and paymaster provider on Starknet, powering the entire ecosystem's spot trading experience.
When you swap on SwapX, AVNU checks all available pools and routes your trade through the most efficient path — meaning you get the best rate without manually checking multiple exchanges.

Features of SwapX
Swap between STRK, ETH, USDC and USDT
Real-time price quotes before you confirm
Shows live rate, price impact, and exact receive amount
Gas fees paid in STRK — no ETH needed
Supports Argent X and Braavos wallets
Disconnect and reconnect wallet anytime
Live balance display for the token you're swapping
Transaction hash with direct Starkscan explorer link after every swap


How To Run Locally
Requirements
Node.js v18 or higher
An Argent X or Braavos wallet
Some STRK on Sepolia testnet (get free testnet tokens at starknet-faucet.vercel.app)


Setup
Bash
Create a .env file in the root folder:
Code
⚠️ Never share your private key or push it to GitHub. Add .env to your .gitignore.
Start the server:
Bash
Open your browser at http://localhost:3000
🔄 How To Swap
Open http://localhost:3000
Click Connect and choose Argent X or Braavos
Select the token you want to swap from (You Pay)
Select the token you want to receive (You Receive)
Enter the amount
Wait for the live quote — rate and receive amount update automatically
Click SWAP and confirm in your wallet
Transaction hash appears with a link to Starkscan


Switching To Mainnet
Two changes in server.js:
1. Change the AVNU API URL:
Js
2. Update your Alchemy RPC URL in .env:
Code
Also update the Starkscan explorer link in public/index.html:
Js
Token addresses for STRK, ETH, USDC and USDT are identical on both Sepolia and Mainnet — no changes needed there.
🪙 Supported Tokens
Token
Decimals
Contract Address
STRK
18
0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d
ETH
18
0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
USDC
6
0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8
USDT
6
0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8
USDC and USDT pairs may show "No route found" on Sepolia due to limited testnet liquidity. Both pairs work correctly on mainnet.


💡 How Gas Works
Starknet uses account abstraction natively, meaning gas fees can be paid in STRK instead of ETH. SwapX shows "Paid in STRK" for gas — this means:
You don't need ETH in your wallet at any point
Gas is deducted in STRK on top of your swap amount
Fees are typically a fraction of a cent worth of STRK
🏗 How It Works Under The Hood
1. Quote:
When you type an amount, SwapX calls the AVNU /swap/v2/quotes endpoint with your sell token address, buy token address, and sell amount in hex wei. AVNU returns the best available route and expected receive amount.
2. Build:
When you click Swap, SwapX calls AVNU's /swap/v2/build endpoint with your wallet address and a 0.5% slippage tolerance. AVNU returns the calldata needed to execute the swap on-chain.
3. Execute:
SwapX passes the calldata to your wallet via account.execute(). Your wallet signs and broadcasts the transaction. The transaction hash is returned and linked to Starkscan.


🛠 Project Structure
Code
❗ Common Errors
Error
Cause
Fix
Cannot find module
Dependencies not installed
Run npm install
No route found
USDC/USDT on Sepolia have no liquidity
Use STRK ↔ ETH on testnet
Network error: Failed to fetch
Server not running
Run node server.js first
Wallet not connected
Wallet not approved
Click Connect and approve in wallet
Amount not updating
Quote fetch failed
Check server is running and try again
🔒 Security Notes
SwapX never stores or transmits your private key
All swaps are signed locally in your wallet — SwapX only builds the calldata
The .env file is for local development only — never commit it to GitHub
Every transaction is publicly verifiable on Starkscan


🧱 Built With
Node.js + Express backend
AVNU API for swap routing and best-rate quotes
Starknet.js for wallet connection and transaction execution
Vanilla JavaScript frontend — no frameworks, no dependencies
👤 Author
Built by Valorian0108 · GitHub · LiveWire Pay

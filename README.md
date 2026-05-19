# SwapX

> Gasless token swaps on Starknet — fast, clean, and non-custodial.

SwapX is a lightweight decentralized exchange interface built on Starknet. It lets users swap tokens directly from their browser wallet with no accounts, no sign-ups, and no holding of funds. Gas fees are paid in STRK, and all swaps are routed through AVNU - Starknet's leading DEX aggregator — to guarantee the best available price.

---

## What makes it different

Most swap interfaces are bloated and hard to navigate. SwapX strips it back to what matters: pick your tokens, enter an amount, and swap. The UI gives you live quotes, real price impact, and full control over slippage - nothing more, nothing less.

---

## Features

- **Live quotes** - real-time swap rates fetched from AVNU's aggregator
- **Slippage control** - set tolerance with one click (0.1%, 0.5%, 1%, 5%, or custom)
- **Wallet balance display** - see your token balance before you swap
- **MAX button** - fills the input with your full balance (minus a small gas buffer for STRK)
- **Gasless UX** - all gas is paid in STRK, no ETH needed
- **Ready Wallet + Braavos** - supports both major Starknet wallets
- **Transaction links** - every completed swap links directly to Starkscan

---

## Supported tokens

| Token | Network |
|-------|---------|
| STRK | Starknet Mainnet |
| ETH | Starknet Mainnet |
| USDC | Starknet Mainnet |
| USDT | Starknet Mainnet |

---

## How it works

1. Connect your Starknet wallet (Ready Wallet or Braavos)
2. Choose the token you want to swap from and the one you want to receive
3. Enter an amount — SwapX fetches a live quote from AVNU instantly
4. Review the rate, price impact, and slippage
5. Click Swap and confirm in your wallet

No approvals needed for STRK-native flows. Swap data is built server-side and executed directly by your wallet — SwapX never touches your funds.

---

## Tech

- **Frontend** - Vanilla HTML, CSS, JavaScript (no framework, no build step)
- **Backend** - Node.js + Express, serves the frontend and proxies swap requests
- **Swap routing** - [AVNU Finance](https://avnu.fi) aggregator API
- **Wallets** - Ready Wallet (formerly Argent X) and Braavos via the Starknet wallet API

---

## Live

[swapx-u51l.onrender.com](https://swapx-u51l.onrender.com)

---

## Running locally

```bash
npm install
node server.js
```

Open `http://localhost:3000` in your browser. Make sure you have Ready Wallet or Braavos installed as a browser extension.

---

Built by [@Valorian0108](https://github.com/Valorian0108)

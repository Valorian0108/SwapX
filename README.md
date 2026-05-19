# SwapX

A clean, gasless token swap interface built on Starknet — powered by AVNU.

## What it does

SwapX lets users swap tokens on Starknet (STRK, ETH, USDC, USDT) directly from their browser wallet. It fetches real-time quotes, builds swap transactions via the AVNU aggregator, and executes them through Ready Wallet or Braavos — with gas paid in STRK.

## Stack

- **Frontend** — Vanilla HTML/CSS/JS, no framework, no build step
- **Backend** — Node.js + Express, hosted separately
- **Swap routing** — [AVNU Finance](https://avnu.fi) aggregator API
- **Wallets** — Ready Wallet (Argent X) and Braavos via Starknet.js

## Project structure

```
SwapX/
├── public/
│   └── index.html      # Frontend UI
├── server.js           # Express backend (quote + swap endpoints)
├── package.json
└── vercel.json
```

## Running locally

```bash
npm install
node server.js
```

Then open `http://localhost:3000` in your browser.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/quote` | Fetch a swap quote from AVNU |
| POST | `/swap` | Build swap call data for wallet execution |

### GET `/quote`

```
?fromToken=STRK&toToken=ETH&amount=10
```

### POST `/swap`

```json
{
  "fromToken": "STRK",
  "toToken": "ETH",
  "amount": "10",
  "senderAddress": "0x..."
}
```

## Deployment

- **Frontend** — Deployed on Render as a static site
- **Backend** — Deployed on Render as a web service (`node server.js`)

## Supported tokens

| Token | Network |
|-------|---------|
| STRK | Starknet Mainnet |
| ETH | Starknet Mainnet |
| USDC | Starknet Mainnet |
| USDT | Starknet Mainnet |

## Live

[swapx-u51l.onrender.com](https://swapx-u51l.onrender.com)

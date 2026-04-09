import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const TOKENS = {
  STRK: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  ETH:  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  USDC: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  USDT: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
};

const DECIMALS = { STRK: 18, ETH: 18, USDC: 6, USDT: 6 };

const AVNU_API = "https://starknet.api.avnu.fi";

function toHexWei(amount, token) {
  const dec = DECIMALS[token] ?? 18;
  const multiplier = BigInt(10) ** BigInt(dec);
  return "0x" + (BigInt(Math.floor(parseFloat(amount) * 1e9)) * multiplier / BigInt(1e9)).toString(16);
}

function fromWei(value, token) {
  if (!value) return "0";
  const dec = DECIMALS[token] ?? 18;
  const bn = typeof value === "string" && value.startsWith("0x") ? BigInt(value) : BigInt(value);
  const divisor = BigInt(10) ** BigInt(dec);
  return (Number(bn * BigInt(1000000) / divisor) / 1000000).toFixed(6);
}

app.get("/quote", async (req, res) => {
  const { fromToken, toToken, amount } = req.query;
  if (!TOKENS[fromToken] || !TOKENS[toToken]) return res.json({ success: false, error: "Invalid token" });
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) return res.json({ success: false, error: "Invalid amount" });
  if (fromToken === toToken) return res.json({ success: false, error: "Can't swap same token" });

  try {
    const url = `${AVNU_API}/swap/v2/quotes?sellTokenAddress=${TOKENS[fromToken]}&buyTokenAddress=${TOKENS[toToken]}&sellAmount=${toHexWei(amount, fromToken)}`;
    const response = await fetch(url);
    if (!response.ok) return res.json({ success: false, error: "No route found — pair may not be supported on Sepolia" });

    const data = await response.json();
    if (!data || data.length === 0) return res.json({ success: false, error: "No route found — pair may not be supported on Sepolia" });

    const quote = data[0];
    const buyAmount = fromWei(quote.buyAmount, toToken);
    const rate = (parseFloat(buyAmount) / parseFloat(amount)).toFixed(6);
    const priceImpact = quote.priceImpact && parseFloat(quote.priceImpact) > 0
      ? (parseFloat(quote.priceImpact) * 100).toFixed(2) + "%"
      : "< 0.1%";

    return res.json({ success: true, quoteId: quote.quoteId, buyAmount, buyAmountRaw: quote.buyAmount, rate, priceImpact, fromToken, toToken });
  } catch (err) {
    return res.json({ success: false, error: "Server error: " + err.message });
  }
});

app.post("/swap", async (req, res) => {
  const { fromToken, toToken, amount, senderAddress } = req.body;
  if (!TOKENS[fromToken] || !TOKENS[toToken]) return res.json({ success: false, error: "Invalid token" });
  if (!senderAddress) return res.json({ success: false, error: "Wallet not connected" });

  try {
    const quoteUrl = `${AVNU_API}/swap/v2/quotes?sellTokenAddress=${TOKENS[fromToken]}&buyTokenAddress=${TOKENS[toToken]}&sellAmount=${toHexWei(amount, fromToken)}`;
    const quoteRes = await fetch(quoteUrl);
    if (!quoteRes.ok) return res.json({ success: false, error: "No route found" });

    const quotes = await quoteRes.json();
    if (!quotes || quotes.length === 0) return res.json({ success: false, error: "No route found" });

    const quote = quotes[0];
    const buildRes = await fetch(`${AVNU_API}/swap/v2/build`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quoteId: quote.quoteId, takerAddress: senderAddress, slippage: 0.005 }),
    });

    const buildData = await buildRes.json();
    if (!buildData || !buildData.calls) return res.json({ success: false, error: "Failed to build swap" });

    return res.json({ success: true, calls: buildData.calls, quoteId: quote.quoteId, buyAmount: fromWei(quote.buyAmount, toToken) });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("SwapZap running at http://localhost:3000"));

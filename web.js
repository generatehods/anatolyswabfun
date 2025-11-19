import {
  Connection,
  PublicKey
} from "https://esm.sh/@solana/web3.js";

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

let provider = null;
let wallet = null;

function getProvider() {
  if ("phantom" in window) {
    const p = window.phantom?.solana;
    if (p?.isPhantom) return p;
  }
  return null;
}

async function connectWallet() {
  provider = getProvider();
  if (!provider) {
    alert("Phantom Wallet not found!");
    return;
  }

  try {
    const resp = await provider.connect();
    wallet = resp.publicKey;
    document.getElementById("walletAddress").innerText = wallet.toString();
    loadBalance();
  } catch (err) {
    console.log("Connect error", err);
  }
}

async function loadBalance() {
  if (!wallet) return;

  const sol = await connection.getBalance(wallet);
  document.getElementById("balanceSOL").innerText =
    "SOL: " + (sol / 1e9).toFixed(4);
}

document.getElementById("connectBtn").onclick = connectWallet;

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_path = __toESM(require("path"), 1);
var import_https2 = __toESM(require("https"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");

// src/data/coinCatalog.ts
var NAME_TO_TICKER_MAP = {
  "BITCOIN": "BTC",
  "ETHEREUM": "ETH",
  "SOLANA": "SOL",
  "BINANCE": "BNB",
  "BINANCE COIN": "BNB",
  "BNB": "BNB",
  "RIPPLE": "XRP",
  "XRP": "XRP",
  "CARDANO": "ADA",
  "ADA": "ADA",
  "DOGECOIN": "DOGE",
  "DOGE": "DOGE",
  "AVALANCHE": "AVAX",
  "AVAX": "AVAX",
  "SUI": "SUI",
  "SUI NETWORK": "SUI",
  "NEAR": "NEAR",
  "NEAR PROTOCOL": "NEAR",
  "CHAINLINK": "LINK",
  "LINK": "LINK",
  "POLKADOT": "DOT",
  "DOT": "DOT",
  "PEPE": "PEPE",
  "SHIBA": "SHIB",
  "SHIBA INU": "SHIB",
  "SHIB": "SHIB",
  "TRON": "TRX",
  "TRX": "TRX",
  "APTOS": "APT",
  "APT": "APT",
  "RENDER": "RENDER",
  "RENDER NETWORK": "RENDER",
  "INJECTIVE": "INJ",
  "INJ": "INJ",
  "ONDO": "ONDO",
  "ONDO FINANCE": "ONDO",
  "CELESTIA": "TIA",
  "TIA": "TIA",
  "ARBITRUM": "ARB",
  "ARB": "ARB",
  "OPTIMISM": "OP",
  "OP": "OP",
  "SEI": "SEI",
  "SEI NETWORK": "SEI",
  "FETCH": "FET",
  "FETCH.AI": "FET",
  "FET": "FET",
  "KASPA": "KAS",
  "KAS": "KAS",
  "INTERNET COMPUTER": "ICP",
  "ICP": "ICP",
  "TONCOIN": "TON",
  "TON": "TON",
  "STELLAR": "XLM",
  "XLM": "XLM",
  "LITECOIN": "LTC",
  "LTC": "LTC",
  "HEDERA": "HBAR",
  "HBAR": "HBAR",
  "POLYGON": "MATIC",
  "MATIC": "MATIC",
  "UNISWAP": "UNI",
  "UNI": "UNI",
  "AAVE": "AAVE"
};
var DEFAULT_COIN_DATABASE = {
  BTC: {
    ticker: "BTC",
    name: "Bitcoin",
    sector: "Store of Value & Sovereign L1",
    defaultPrice: 80550,
    circulatingSupply: 1982e4,
    maxSupply: 21e6,
    commits30d: 385,
    githubStars: 78500,
    contributors: 1120,
    networkType: "Hashrate/Difficulty",
    networkValue: "725 EH/s (All-Time High)",
    dailyTransactions: 58e4,
    activeAddresses: 94e4,
    mvrv: 2.15,
    unlockWarning: null,
    problemSolved: "Decentralized sound digital money without sovereign counterparty risk.",
    competitiveMoat: "Unrivaled hashrate security, institutional spot ETF adoption, and global regulatory recognition."
  },
  ETH: {
    ticker: "ETH",
    name: "Ethereum",
    sector: "Smart Contract L1 & Settlement Layer",
    defaultPrice: 2585,
    circulatingSupply: 1204e5,
    maxSupply: null,
    commits30d: 640,
    githubStars: 47200,
    contributors: 890,
    networkType: "Staking Ratio",
    networkValue: "28.4% staked (~34.2M ETH)",
    dailyTransactions: 124e4,
    activeAddresses: 51e4,
    mvrv: 1.48,
    unlockWarning: "No cliff unlocks; issuance offset dynamically by EIP-1559 base fee burns.",
    problemSolved: "Turing-complete decentralized execution layer and global financial settlement infrastructure.",
    competitiveMoat: "Deepest DeFi liquidity, largest developer ecosystem, and institutional L2 rollup moat."
  },
  SOL: {
    ticker: "SOL",
    name: "Solana",
    sector: "High-Throughput Monolithic L1",
    defaultPrice: 108.5,
    circulatingSupply: 476e6,
    maxSupply: null,
    commits30d: 512,
    githubStars: 13400,
    contributors: 430,
    networkType: "Staking Ratio",
    networkValue: "66.8% staked across 1,480 validators",
    dailyTransactions: 42e6,
    activeAddresses: 215e4,
    mvrv: 2.05,
    unlockWarning: "FTX/Alameda estate scheduled linear vesting (~1.8M SOL/month through 2027).",
    problemSolved: "Sub-second confirmation, low-cost decentralized execution for retail payments and high-frequency trading.",
    competitiveMoat: "Dominant retail mindshare, Firedancer client upgrade, and extreme transaction throughput."
  },
  BNB: {
    ticker: "BNB",
    name: "BNB Chain",
    sector: "Exchange Ecosystem & EVM L1",
    defaultPrice: 752.5,
    circulatingSupply: 14588e4,
    maxSupply: 2e8,
    commits30d: 280,
    githubStars: 5200,
    contributors: 165,
    networkType: "TVL/Validators",
    networkValue: "$5.2B TVL across BSC ecosystem",
    dailyTransactions: 41e5,
    activeAddresses: 11e5,
    mvrv: 1.72,
    unlockWarning: "Quarterly Auto-Burn program consistently destroys supply until 100M BNB target is reached.",
    problemSolved: "Low-latency EVM transactions backed by Binance global exchange liquidity and Launchpool incentives.",
    competitiveMoat: "Binance exchange integration, Binance Launchpool utility, and established retail userbase."
  },
  XRP: {
    ticker: "XRP",
    name: "XRP",
    sector: "Cross-Border Payments & Banking Liquidity",
    defaultPrice: 1.39,
    circulatingSupply: 569e8,
    maxSupply: 1e11,
    commits30d: 190,
    githubStars: 4800,
    contributors: 120,
    networkType: "TVL/Validators",
    networkValue: "150+ RippleNet financial institutions",
    dailyTransactions: 16e5,
    activeAddresses: 32e4,
    mvrv: 1.35,
    unlockWarning: "Monthly 1B XRP escrow unlock (typically 700-800M re-locked into new escrow contracts).",
    problemSolved: "Instant, low-cost cross-border interbank settlements and liquidity bridging (On-Demand Liquidity).",
    competitiveMoat: "Ripple Labs global regulatory clarity, banking institutional corridors, and 12-year proven uptime."
  },
  DOGE: {
    ticker: "DOGE",
    name: "Dogecoin",
    sector: "Decentralized PoW Currency & Culture",
    defaultPrice: 0.085,
    circulatingSupply: 1475e8,
    maxSupply: null,
    commits30d: 140,
    githubStars: 15400,
    contributors: 85,
    networkType: "Hashrate/Difficulty",
    networkValue: "1.2 PH/s auxiliary-PoW with Litecoin",
    dailyTransactions: 34e4,
    activeAddresses: 21e4,
    mvrv: 1.28,
    unlockWarning: "Fixed annual inflation of 5 billion DOGE (~3.4% dynamic decline over time).",
    problemSolved: "Lightweight, decentralized peer-to-peer micro-tipping and retail payment medium.",
    competitiveMoat: "Immense global brand recognition, merged-mining security with Litecoin, and viral cultural mindshare."
  },
  ADA: {
    ticker: "ADA",
    name: "Cardano",
    sector: "Peer-Reviewed Proof-of-Stake L1",
    defaultPrice: 0.221,
    circulatingSupply: 3577e7,
    maxSupply: 45e9,
    commits30d: 490,
    githubStars: 7300,
    contributors: 280,
    networkType: "Staking Ratio",
    networkValue: "64.2% staked (~23B ADA) across 3,000+ pools",
    dailyTransactions: 95e3,
    activeAddresses: 48e3,
    mvrv: 1.12,
    unlockWarning: "Dynamic staking rewards emission; no private venture-capital lockup dumps remaining.",
    problemSolved: "Formal verification, peer-reviewed academic rigor, and secure eUTxO smart contracts for sovereign systems.",
    competitiveMoat: "Highly decentralized stake distribution, native liquid staking without slashing, and Voltaire decentralized governance."
  },
  AVAX: {
    ticker: "AVAX",
    name: "Avalanche",
    sector: "Multi-Subnet Institutional L1",
    defaultPrice: 9.85,
    circulatingSupply: 408e6,
    maxSupply: 72e7,
    commits30d: 310,
    githubStars: 4600,
    contributors: 190,
    networkType: "Staking Ratio",
    networkValue: "58.5% staked (~238M AVAX)",
    dailyTransactions: 62e4,
    activeAddresses: 95e3,
    mvrv: 1.25,
    unlockWarning: "Scheduled foundation and partner staking unlocks (~9.5M AVAX quarterly).",
    problemSolved: "Sub-second finality and customizable institutional enterprise app-chains (Subnets).",
    competitiveMoat: "Avalanche consensus speed, institutional partnerships (Citi, JPMorgan Onyx tests), and EVM compatibility."
  },
  SUI: {
    ticker: "SUI",
    name: "Sui Network",
    sector: "Object-Centric Move L1",
    defaultPrice: 3.25,
    circulatingSupply: 295e7,
    maxSupply: 1e10,
    commits30d: 480,
    githubStars: 6900,
    contributors: 245,
    networkType: "TVL/Validators",
    networkValue: "$1.48B TVL / 106 active validators",
    dailyTransactions: 98e5,
    activeAddresses: 82e4,
    mvrv: 1.85,
    unlockWarning: "64M SUI monthly linear unlock schedule (monitor monthly circulating inflation).",
    problemSolved: "Parallel transaction execution using Object-centric Move language for frictionless consumer Web3.",
    competitiveMoat: "Mysten Labs engineering pedigree, native zkLogin, and sub-100ms latency."
  },
  NEAR: {
    ticker: "NEAR",
    name: "NEAR Protocol",
    sector: "Sharded L1 & User-Owned AI",
    defaultPrice: 3.58,
    circulatingSupply: 122e7,
    maxSupply: null,
    commits30d: 410,
    githubStars: 3900,
    contributors: 210,
    networkType: "Staking Ratio",
    networkValue: "48.2% staked (~588M NEAR)",
    dailyTransactions: 48e5,
    activeAddresses: 145e4,
    mvrv: 1.42,
    unlockWarning: "5% annual inflation offset by transaction fee burning and ecosystem grants.",
    problemSolved: "Dynamic Nightshade sharding, chain abstraction, and decentralized open-source AI infrastructure.",
    competitiveMoat: "Industry-leading consumer daily active users, top-tier AI founder pedigree, and chain abstraction."
  },
  LINK: {
    ticker: "LINK",
    name: "Chainlink",
    sector: "Decentralized Oracle & RWA Interoperability",
    defaultPrice: 16.9,
    circulatingSupply: 6268e5,
    maxSupply: 1e9,
    commits30d: 390,
    githubStars: 8200,
    contributors: 310,
    networkType: "TVL/Validators",
    networkValue: "$34.5B Total Value Enabled (TVE) across 18 chains",
    dailyTransactions: 42e3,
    activeAddresses: 34e3,
    mvrv: 1.32,
    unlockWarning: "Non-dilutive staking rewards; occasional team treasury sales for ecosystem development.",
    problemSolved: "Secure off-chain data feeds, CCIP cross-chain interoperability, and institutional SWIFT/RWA bridging.",
    competitiveMoat: "Monopoly over DeFi price feeds (>80% market share) and direct partnerships with SWIFT & DTCC."
  },
  DOT: {
    ticker: "DOT",
    name: "Polkadot",
    sector: "Heterogeneous Multi-Chain Relay L0",
    defaultPrice: 1.1,
    circulatingSupply: 144e7,
    maxSupply: null,
    commits30d: 520,
    githubStars: 7900,
    contributors: 330,
    networkType: "Staking Ratio",
    networkValue: "54.8% staked across Nominated PoS validators",
    dailyTransactions: 18e4,
    activeAddresses: 62e3,
    mvrv: 0.95,
    unlockWarning: "Polkadot 2.0 dynamic agile coretime model transitions away from rigid 2-year parachain auctions.",
    problemSolved: "Shared security and cross-consensus messaging (XCM) across sovereign application blockchains.",
    competitiveMoat: "Gavin Wood Ethereum co-founder pedigree, Substrate development framework, and robust shared security."
  },
  RENDER: {
    ticker: "RENDER",
    name: "Render Network",
    sector: "Decentralized GPU Compute & AI",
    defaultPrice: 6.75,
    circulatingSupply: 518e6,
    maxSupply: 532e6,
    commits30d: 185,
    githubStars: 3400,
    contributors: 110,
    networkType: "TVL/Validators",
    networkValue: "4,800+ Active GPU Nodes (OctaneRender integrated)",
    dailyTransactions: 68e3,
    activeAddresses: 28e3,
    mvrv: 1.62,
    unlockWarning: "High circulating % (97.3%). Burn-and-Mint Equilibrium (BME) creates deflationary pressure on compute load.",
    problemSolved: "Distributed GPU rendering and AI inference scaling for 3D creators and ML researchers.",
    competitiveMoat: "OTOY corporate integration, Apple keynote showcase, and deep artist network."
  },
  ONDO: {
    ticker: "ONDO",
    name: "Ondo Finance",
    sector: "Real World Assets (RWA) & Tokenized Treasuries",
    defaultPrice: 1.24,
    circulatingSupply: 144e7,
    maxSupply: 1e10,
    commits30d: 120,
    githubStars: 1800,
    contributors: 65,
    networkType: "TVL/Validators",
    networkValue: "$650M+ in Tokenized US Treasuries (OUSG & USDY)",
    dailyTransactions: 18e3,
    activeAddresses: 12e3,
    mvrv: 1.58,
    unlockWarning: "Low circulating percentage (~14.4%). Major institutional and team unlocks scheduled over next 24 months.",
    problemSolved: "Bringing institutional-grade US Treasury yield and structured financial products on-chain.",
    competitiveMoat: "BlackRock BUIDL integration, strict regulatory compliance, and premier RWA brand."
  },
  PEPE: {
    ticker: "PEPE",
    name: "Pepe",
    sector: "Meme Token & Retail Cultural Liquidity",
    defaultPrice: 4e-6,
    circulatingSupply: 42069e10,
    maxSupply: 42069e10,
    commits30d: 45,
    githubStars: 1200,
    contributors: 30,
    networkType: "TVL/Validators",
    networkValue: "$1.7B Market Liquidity on DEX & CEX pairs",
    dailyTransactions: 21e4,
    activeAddresses: 14e4,
    mvrv: 1.38,
    unlockWarning: "100% of supply circulating. No team vesting dilution, zero dev taxes.",
    problemSolved: "Pure viral decentralized cultural attention and high-beta liquidity reflection of market risk appetite.",
    competitiveMoat: "Global internet meme icon, multi-exchange top-tier liquidity, and zero inflation."
  },
  SHIB: {
    ticker: "SHIB",
    name: "Shiba Inu",
    sector: "Meme Ecosystem & Shibarium L2",
    defaultPrice: 54e-7,
    circulatingSupply: 589e12,
    maxSupply: null,
    commits30d: 110,
    githubStars: 2800,
    contributors: 75,
    networkType: "TVL/Validators",
    networkValue: "Shibarium L2 network and ShibaSwap DEX",
    dailyTransactions: 32e4,
    activeAddresses: 18e4,
    mvrv: 1.22,
    unlockWarning: "Over 410 trillion SHIB already burned; ongoing Shibarium transaction fee burn mechanism.",
    problemSolved: "Decentralized community-led ecosystem spanning metaverse, gaming, and Shibarium Layer-2 scaling.",
    competitiveMoat: 'Vast worldwide community ("ShibArmy") and multi-utility decentralized ecosystem.'
  },
  TRX: {
    ticker: "TRX",
    name: "TRON",
    sector: "Global Stablecoin Settlement L1",
    defaultPrice: 0.342,
    circulatingSupply: 864e8,
    maxSupply: null,
    commits30d: 210,
    githubStars: 3100,
    contributors: 130,
    networkType: "TVL/Validators",
    networkValue: "$60B+ USDT circulating on TRC-20",
    dailyTransactions: 78e5,
    activeAddresses: 24e5,
    mvrv: 1.45,
    unlockWarning: "Deflationary supply model driven by high USDT fee burn rates.",
    problemSolved: "High-speed, near-zero fee international USDT stablecoin transfers in developing economies.",
    competitiveMoat: "Dominates global retail USDT peer-to-peer transaction volume and liquidity velocity."
  },
  APT: {
    ticker: "APT",
    name: "Aptos",
    sector: "Parallel Move Execution L1",
    defaultPrice: 8.95,
    circulatingSupply: 512e6,
    maxSupply: null,
    commits30d: 360,
    githubStars: 5800,
    contributors: 195,
    networkType: "Staking Ratio",
    networkValue: "82.5% staked across 140 validators",
    dailyTransactions: 19e5,
    activeAddresses: 31e4,
    mvrv: 1.52,
    unlockWarning: "Monthly 11.3M APT linear unlocks for core contributors and investors.",
    problemSolved: "Diem-derived Move language execution with Block-STM parallel engine for enterprise throughput.",
    competitiveMoat: "Meta/Diem engineering alumni, partnerships with Microsoft and NBCUniversal, and sub-second latency."
  },
  INJ: {
    ticker: "INJ",
    name: "Injective",
    sector: "Interoperable DeFi & Financial L1",
    defaultPrice: 21.4,
    circulatingSupply: 1e8,
    maxSupply: 1e8,
    commits30d: 290,
    githubStars: 2900,
    contributors: 110,
    networkType: "Staking Ratio",
    networkValue: "57.8% staked across active Cosmos validators",
    dailyTransactions: 84e4,
    activeAddresses: 75e3,
    mvrv: 1.65,
    unlockWarning: "100% of initial supply now unlocked. Weekly community auction burns 60% of all dApp fees.",
    problemSolved: "Plug-and-play institutional financial primitives: shared on-chain orderbook, binary options, and derivatives.",
    competitiveMoat: "Zero gas fees for market makers, IBC cross-chain liquidity, and high institutional trading volume."
  },
  TIA: {
    ticker: "TIA",
    name: "Celestia",
    sector: "Modular Blockchain & Data Availability (DA)",
    defaultPrice: 4.85,
    circulatingSupply: 42e7,
    maxSupply: 1e9,
    commits30d: 340,
    githubStars: 3100,
    contributors: 160,
    networkType: "Staking Ratio",
    networkValue: "68.4% staked across 100 validators",
    dailyTransactions: 95e3,
    activeAddresses: 42e3,
    mvrv: 1.25,
    unlockWarning: "Significant seed investor and team token unlocks over upcoming quarters.",
    problemSolved: "First modular blockchain network specializing purely in scalable data availability (DA) for rollups.",
    competitiveMoat: "Pioneered modular blockchain architecture; 99% cost reduction in DA for Arbitrum, OP Stack, and Polygon CDK."
  },
  ARB: {
    ticker: "ARB",
    name: "Arbitrum",
    sector: "Ethereum Layer 2 Rollup",
    defaultPrice: 0.68,
    circulatingSupply: 41e8,
    maxSupply: 1e10,
    commits30d: 380,
    githubStars: 4100,
    contributors: 175,
    networkType: "TVL/Validators",
    networkValue: "$14.2B Total Value Locked (TVL)",
    dailyTransactions: 17e5,
    activeAddresses: 45e4,
    mvrv: 1.15,
    unlockWarning: "Scheduled 92.6M ARB monthly linear vesting for team and advisors through 2027.",
    problemSolved: "High-speed EVM-equivalent optimistic rollup scaling Ethereum throughput while inheriting L1 security.",
    competitiveMoat: "Highest TVL and transaction fee revenue among all Ethereum Layer 2 scaling solutions."
  },
  OP: {
    ticker: "OP",
    name: "Optimism",
    sector: "Ethereum Layer 2 & Superchain Infrastructure",
    defaultPrice: 1.45,
    circulatingSupply: 125e7,
    maxSupply: 4294967296,
    commits30d: 410,
    githubStars: 5100,
    contributors: 220,
    networkType: "TVL/Validators",
    networkValue: "$7.8B Total Value Locked across OP Superchain",
    dailyTransactions: 98e4,
    activeAddresses: 31e4,
    mvrv: 1.2,
    unlockWarning: "Monthly 31.3M OP unlocked for core contributors and investors.",
    problemSolved: "OP Stack open-source framework standardizing horizontal scaling across an interconnected Superchain.",
    competitiveMoat: "Superchain adoption by Coinbase (Base), Worldcoin, and Kraken (Ink); shared sequencing network."
  },
  TON: {
    ticker: "TON",
    name: "Toncoin",
    sector: "Telegram Consumer Web3 & Social L1",
    defaultPrice: 4.95,
    circulatingSupply: 254e7,
    maxSupply: 511e7,
    commits30d: 220,
    githubStars: 4300,
    contributors: 110,
    networkType: "Staking Ratio",
    networkValue: "620M TON staked / $450M TVL",
    dailyTransactions: 82e5,
    activeAddresses: 195e4,
    mvrv: 1.6,
    unlockWarning: "Believers Vault unlocks are managed with multi-year community staking schedules.",
    problemSolved: "Direct seamless onboarding of 900M+ Telegram users to Web3 wallets and decentralized mini-apps.",
    competitiveMoat: "Exclusive integrated distribution inside the Telegram messenger application."
  },
  LTC: {
    ticker: "LTC",
    name: "Litecoin",
    sector: "Scrypt Proof-of-Work Digital Silver",
    defaultPrice: 88.5,
    circulatingSupply: 751e5,
    maxSupply: 84e6,
    commits30d: 165,
    githubStars: 4200,
    contributors: 115,
    networkType: "Hashrate/Difficulty",
    networkValue: "1.35 PH/s (Scrypt Merged-Mining with Dogecoin)",
    dailyTransactions: 24e4,
    activeAddresses: 31e4,
    mvrv: 1.15,
    unlockWarning: null,
    problemSolved: "Ultra-reliable low-latency peer-to-peer transactional payment settlement with 100% continuous uptime since 2011.",
    competitiveMoat: "Four-halving maturity, massive BitPay/merchant acceptance, MWEB privacy layer, and merged mining security with Dogecoin."
  },
  BCH: {
    ticker: "BCH",
    name: "Bitcoin Cash",
    sector: "Peer-to-Peer Electronic Cash (SHA-256 PoW)",
    defaultPrice: 345,
    circulatingSupply: 1978e4,
    maxSupply: 21e6,
    commits30d: 140,
    githubStars: 1900,
    contributors: 65,
    networkType: "Hashrate/Difficulty",
    networkValue: "4.8 EH/s (SHA-256 Hashrate)",
    dailyTransactions: 18e4,
    activeAddresses: 12e4,
    mvrv: 1.22,
    unlockWarning: null,
    problemSolved: "High-throughput on-chain payment scalability with sub-cent transaction fees and CashTokens smart contract primitives.",
    competitiveMoat: "Original Bitcoin UTXO ledger distribution, 32MB on-chain block capacity, and established merchant network."
  },
  XLM: {
    ticker: "XLM",
    name: "Stellar",
    sector: "Cross-Border Payments & Remittance Infrastructure",
    defaultPrice: 0.155,
    circulatingSupply: 301e8,
    maxSupply: 50001806812,
    commits30d: 280,
    githubStars: 3200,
    contributors: 140,
    networkType: "TVL/Validators",
    networkValue: "Stellar Consensus Protocol (SCP) Quorum Slices",
    dailyTransactions: 32e5,
    activeAddresses: 18e4,
    mvrv: 1.18,
    unlockWarning: "Foundation development funds distributed via community ecosystem grants.",
    problemSolved: "Instant, low-cost multi-currency fiat on/off ramps and cross-border settlement for unbanked populations.",
    competitiveMoat: "MoneyGram, Franklin Templeton on-chain Treasury Fund (FOBXX), and Soroban Rust smart contract platform."
  },
  HBAR: {
    ticker: "HBAR",
    name: "Hedera",
    sector: "Enterprise Distributed Ledger (Hashgraph DLT)",
    defaultPrice: 0.082,
    circulatingSupply: 382e8,
    maxSupply: 5e10,
    commits30d: 320,
    githubStars: 2100,
    contributors: 95,
    networkType: "TVL/Validators",
    networkValue: "Hedera Governing Council (39 global institutional nodes)",
    dailyTransactions: 95e6,
    activeAddresses: 42e4,
    mvrv: 1.2,
    unlockWarning: "Scheduled treasury allocations governed by the Hedera Governing Council.",
    problemSolved: "ABFT (Asynchronous Byzantine Fault Tolerant) enterprise consensus with predictable sub-cent transaction fees and micro-transactions.",
    competitiveMoat: "Governing council membership including Google, IBM, Dell, Boeing, and Hitachi; record-breaking real-world TPS."
  },
  UNI: {
    ticker: "UNI",
    name: "Uniswap",
    sector: "Decentralized Exchange (Automated Market Maker)",
    defaultPrice: 7.45,
    circulatingSupply: 6004e5,
    maxSupply: 1e9,
    commits30d: 290,
    githubStars: 5800,
    contributors: 180,
    networkType: "TVL/Validators",
    networkValue: "$5.8B Total Value Locked across multi-chains / Unichain",
    dailyTransactions: 48e4,
    activeAddresses: 21e4,
    mvrv: 1.32,
    unlockWarning: "Vesting mostly completed; DAO treasury allocation remains for ecosystem growth.",
    problemSolved: "Permissionless constant-product and concentrated liquidity market-making for digital assets.",
    competitiveMoat: "Dominant decentralized spot trading volume, Uniswap v4 Hooks architecture, and Unichain rollup deployment."
  },
  AAVE: {
    ticker: "AAVE",
    name: "Aave",
    sector: "Decentralized Lending & Liquidity Protocol",
    defaultPrice: 165,
    circulatingSupply: 1495e4,
    maxSupply: 16e6,
    commits30d: 260,
    githubStars: 2400,
    contributors: 130,
    networkType: "TVL/Validators",
    networkValue: "$22.5B Protocol Liquidity / $12B Borrow Volume",
    dailyTransactions: 75e3,
    activeAddresses: 45e3,
    mvrv: 1.4,
    unlockWarning: "Circulating supply is >93% of total; minimal dilution risk.",
    problemSolved: "Non-custodial overcollateralized lending, flash loans, and cross-chain liquidity markets.",
    competitiveMoat: "DeFi blue-chip safety track record through multiple market cycles, GHO native stablecoin, and Aave v4 architecture."
  },
  KAS: {
    ticker: "KAS",
    name: "Kaspa",
    sector: "BlockDAG High-Speed Proof-of-Work",
    defaultPrice: 0.125,
    circulatingSupply: 251e8,
    maxSupply: 287e8,
    commits30d: 310,
    githubStars: 3900,
    contributors: 85,
    networkType: "Hashrate/Difficulty",
    networkValue: "1.1 EH/s (GHOSTDAG ASIC Hashrate)",
    dailyTransactions: 42e4,
    activeAddresses: 14e4,
    mvrv: 1.45,
    unlockWarning: "Rapid chromatic halving schedule reduces emissions smoothly every month.",
    problemSolved: "Solving the PoW blockchain trilemma through GHOSTDAG parallel block creation with 10 blocks/sec throughput.",
    competitiveMoat: "Pure fair-launch PoW without pre-mine or VC allocation; sub-second transaction finality."
  },
  ICP: {
    ticker: "ICP",
    name: "Internet Computer",
    sector: "Decentralized Cloud & Sovereign Compute L1",
    defaultPrice: 7.8,
    circulatingSupply: 474e6,
    maxSupply: null,
    commits30d: 580,
    githubStars: 3100,
    contributors: 260,
    networkType: "TVL/Validators",
    networkValue: "Chain Fusion technology / 550+ Subnet node machines",
    dailyTransactions: 38e6,
    activeAddresses: 28e4,
    mvrv: 1.1,
    unlockWarning: "Early 8-year neuron staking unlocks gradually decreasing in velocity.",
    problemSolved: "Hosting full-stack Web3 applications, smart contracts, and decentralized AI entirely on-chain without AWS/cloud dependencies.",
    competitiveMoat: "Chain-key cryptography, direct Bitcoin/Ethereum Chain Fusion integration, and zero gas fees for end users via reverse gas."
  },
  XMR: {
    ticker: "XMR",
    name: "Monero",
    sector: "Privacy-Preserving Proof-of-Work (RandomX)",
    defaultPrice: 155,
    circulatingSupply: 1845e4,
    maxSupply: 1845e4,
    commits30d: 210,
    githubStars: 8900,
    contributors: 290,
    networkType: "Hashrate/Difficulty",
    networkValue: "2.8 GH/s (CPU-Optimized RandomX Hashrate)",
    dailyTransactions: 32e3,
    activeAddresses: 28e3,
    mvrv: 1.12,
    unlockWarning: "Tail emission of 0.6 XMR per block provides permanent miner incentive.",
    problemSolved: "Fungible, confidential, untraceable peer-to-peer digital cash with default RingCT and Stealth Addresses.",
    competitiveMoat: "Unbroken privacy track record, CPU-only mining decentralization, and global dark-liquidity gold standard."
  },
  FET: {
    ticker: "FET",
    name: "Artificial Superintelligence Alliance",
    sector: "Decentralized AI & Autonomous Agents",
    defaultPrice: 1.18,
    circulatingSupply: 26e8,
    maxSupply: 2719e6,
    commits30d: 340,
    githubStars: 2900,
    contributors: 110,
    networkType: "Staking Ratio",
    networkValue: "Cosmos SDK Tendermint Staking / Agent Network",
    dailyTransactions: 11e4,
    activeAddresses: 52e3,
    mvrv: 1.35,
    unlockWarning: "Token merger conversion (FET + AGIX + OCEAN) supply integration.",
    problemSolved: "Decentralized autonomous AI agent coordination, compute sharing, and machine-to-machine data marketplaces.",
    competitiveMoat: "Combined alliance of Fetch.ai, SingularityNET, and Ocean Protocol under unified ASI narrative."
  },
  SEI: {
    ticker: "SEI",
    name: "Sei Network",
    sector: "Parallelized EVM Layer 1",
    defaultPrice: 0.32,
    circulatingSupply: 395e7,
    maxSupply: 1e10,
    commits30d: 420,
    githubStars: 1800,
    contributors: 95,
    networkType: "Staking Ratio",
    networkValue: "61.5% staked / 390ms block finality",
    dailyTransactions: 48e5,
    activeAddresses: 32e4,
    mvrv: 1.25,
    unlockWarning: "Scheduled monthly investor and ecosystem vesting unlocks (~125M SEI/mo).",
    problemSolved: "Optimistic parallelized EVM execution delivering 12,500 TPS and 390ms sub-second finality for high-frequency trading.",
    competitiveMoat: "Fastest EVM execution layer, Twin Turbo consensus, and built-in central limit order book (CLOB) engine."
  }
};
function resolveCoinMetadata(tickerInput, customName) {
  const upper = tickerInput.toUpperCase().trim();
  const canonicalTicker = NAME_TO_TICKER_MAP[upper] || upper;
  if (DEFAULT_COIN_DATABASE[canonicalTicker]) {
    return DEFAULT_COIN_DATABASE[canonicalTicker];
  }
  return {
    ticker: canonicalTicker,
    name: customName || canonicalTicker,
    sector: "Emerging Web3 / Crypto Protocol",
    defaultPrice: 1,
    circulatingSupply: 1e8,
    maxSupply: 2e8,
    commits30d: 140,
    githubStars: 1800,
    contributors: 45,
    networkType: "TVL/Validators",
    networkValue: "Decentralized node network & liquidity pools",
    dailyTransactions: 65e3,
    activeAddresses: 24e3,
    mvrv: 1.35,
    unlockWarning: "Review token lockup and team allocation vesting before sizing large positions.",
    problemSolved: `Decentralized infrastructure and utility mechanisms for the ${canonicalTicker} ecosystem.`,
    competitiveMoat: `Community adoption and specialized niche architecture within Web3.`
  };
}

// server/marketPrices.ts
var import_https = __toESM(require("https"), 1);
var cachedBtcPrice = { price: 80550, timestamp: 0 };
function fetchHttpsJson(url, timeoutMs = 4e3) {
  return new Promise((resolve) => {
    const req = import_https.default.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0 (CryptoInstitutional/1.0)" }, timeout: timeoutMs },
      (res) => {
        if (res.statusCode !== 200) {
          return resolve(null);
        }
        let data = "";
        res.on("data", (chunk) => data += chunk);
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(null);
          }
        });
      }
    );
    req.on("error", () => resolve(null));
    req.on("timeout", () => {
      req.destroy();
      resolve(null);
    });
  });
}
async function getLiveBtcPrice() {
  const now = Date.now();
  if (cachedBtcPrice.timestamp && now - cachedBtcPrice.timestamp < 15e3) {
    return cachedBtcPrice.price;
  }
  const binanceBtc = await fetchHttpsJson("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT", 3e3);
  if (binanceBtc && binanceBtc.lastPrice) {
    const p = parseFloat(binanceBtc.lastPrice);
    if (!isNaN(p) && p > 1e3) {
      cachedBtcPrice = { price: p, timestamp: now };
      return p;
    }
  }
  return cachedBtcPrice.price || 80550;
}
async function fetchOnlineCoinStats(ticker, defaultPrice) {
  const sym = ticker.toUpperCase().trim();
  const binanceData = await fetchHttpsJson(`https://api.binance.com/api/v3/ticker/24hr?symbol=${sym}USDT`, 3500);
  if (binanceData && binanceData.lastPrice) {
    const p = parseFloat(binanceData.lastPrice);
    const chg = parseFloat(binanceData.priceChangePercent);
    const hi = parseFloat(binanceData.highPrice);
    const lo = parseFloat(binanceData.lowPrice);
    const vol = parseFloat(binanceData.quoteVolume || binanceData.volume);
    if (!isNaN(p) && p > 0) {
      return {
        source: "binance",
        priceUsd: p,
        change24hPct: isNaN(chg) ? 0 : parseFloat(chg.toFixed(2)),
        high24h: isNaN(hi) ? void 0 : hi,
        low24h: isNaN(lo) ? void 0 : lo,
        volumeUsd: isNaN(vol) ? void 0 : vol
      };
    }
  }
  try {
    const cgSearch = await fetchHttpsJson(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(sym)}`, 3500);
    if (cgSearch && Array.isArray(cgSearch.coins) && cgSearch.coins.length > 0) {
      const match = cgSearch.coins.find((c) => c.symbol && c.symbol.toUpperCase() === sym) || cgSearch.coins[0];
      if (match && match.id) {
        const detail = await fetchHttpsJson(
          `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(match.id)}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
          3500
        );
        if (detail && detail[match.id]) {
          const item = detail[match.id];
          const p = item.usd;
          const chg = item.usd_24h_change;
          if (typeof p === "number" && p > 0) {
            return {
              source: "coingecko",
              priceUsd: p,
              change24hPct: typeof chg === "number" ? parseFloat(chg.toFixed(2)) : 0,
              marketCapUsd: item.usd_market_cap,
              volumeUsd: item.usd_24h_vol
            };
          }
        }
      }
    }
  } catch (err) {
    console.warn(`CoinGecko lookup failed for ${sym}:`, err);
  }
  return {
    source: "fallback",
    priceUsd: defaultPrice > 0 ? defaultPrice : 1,
    change24hPct: 0.5
  };
}
function formatPriceNumber(val) {
  if (val >= 100) return Number(val.toFixed(2));
  if (val >= 1) return Number(val.toFixed(4));
  if (val >= 1e-4) return Number(val.toFixed(6));
  return Number(val.toFixed(8));
}
function calculateDynamicLevels(currentPriceUsd, high24h, low24h) {
  const round = formatPriceNumber;
  const immediateSupport = round(
    low24h && low24h > 0 && low24h < currentPriceUsd ? Math.max(low24h * 0.98, currentPriceUsd * 0.93) : currentPriceUsd * 0.94
  );
  const majorFloor = round(currentPriceUsd * 0.81);
  const primaryResistance = round(
    high24h && high24h > currentPriceUsd ? Math.min(high24h * 1.03, currentPriceUsd * 1.12) : currentPriceUsd * 1.09
  );
  const breakoutTarget = round(currentPriceUsd * 1.28);
  const high90d = round(high24h ? Math.max(high24h * 1.18, currentPriceUsd * 1.25) : currentPriceUsd * 1.35);
  const low90d = round(low24h ? Math.min(low24h * 0.85, currentPriceUsd * 0.72) : currentPriceUsd * 0.7);
  const high1y = round(high90d * 1.35);
  const low1y = round(low90d * 0.75);
  return {
    immediateSupport,
    majorFloor,
    primaryResistance,
    breakoutTarget,
    high90d,
    low90d,
    high1y,
    low1y
  };
}
function generateChartData(currentPriceUsd, priceBtc) {
  const points = [];
  const now = /* @__PURE__ */ new Date();
  let tempUsd = currentPriceUsd * 0.82;
  let tempBtc = priceBtc * 0.88;
  for (let i = 90; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1e3);
    const dateStr = d.toISOString().split("T")[0];
    const noise = Math.sin(i * 0.28) * 0.035 + (i % 5 - 2) * 0.012;
    tempUsd = tempUsd * (1 + (i < 30 ? 5e-3 : 2e-3) + noise);
    tempBtc = tempBtc * (1 + (i < 45 ? 25e-4 : -1e-3) + noise * 0.5);
    if (i === 0) {
      tempUsd = currentPriceUsd;
      tempBtc = priceBtc;
    }
    points.push({
      date: dateStr,
      priceUsd: formatPriceNumber(tempUsd),
      priceBtc: Number(tempBtc.toFixed(8)),
      volumeUsd: Math.round(currentPriceUsd * 4e7 * (0.8 + Math.abs(noise) * 4))
    });
  }
  return points;
}

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  try {
    return new import_genai.GoogleGenAI({ apiKey });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
    return null;
  }
}
var LIVE_TICKERS_CONFIG = [
  { symbol: "BTC", pair: "BTCUSDT", name: "Bitcoin", defaultPrice: 80520, defaultChange: -0.95 },
  { symbol: "ETH", pair: "ETHUSDT", name: "Ethereum", defaultPrice: 2584, defaultChange: -1.9 },
  { symbol: "SOL", pair: "SOLUSDT", name: "Solana", defaultPrice: 108.5, defaultChange: 2.1 },
  { symbol: "BNB", pair: "BNBUSDT", name: "BNB", defaultPrice: 752.4, defaultChange: -1.7 },
  { symbol: "XRP", pair: "XRPUSDT", name: "XRP", defaultPrice: 1.39, defaultChange: -1.6 },
  { symbol: "DOGE", pair: "DOGEUSDT", name: "Dogecoin", defaultPrice: 0.085, defaultChange: -2.1 },
  { symbol: "ADA", pair: "ADAUSDT", name: "Cardano", defaultPrice: 0.221, defaultChange: -0.76 },
  { symbol: "AVAX", pair: "AVAXUSDT", name: "Avalanche", defaultPrice: 9.85, defaultChange: 10.8 },
  { symbol: "SUI", pair: "SUIUSDT", name: "Sui", defaultPrice: 3.25, defaultChange: 4.6 },
  { symbol: "LTC", pair: "LTCUSDT", name: "Litecoin", defaultPrice: 88.5, defaultChange: 1.8 },
  { symbol: "NEAR", pair: "NEARUSDT", name: "NEAR Protocol", defaultPrice: 3.58, defaultChange: -2.7 },
  { symbol: "LINK", pair: "LINKUSDT", name: "Chainlink", defaultPrice: 16.9, defaultChange: -0.4 },
  { symbol: "DOT", pair: "DOTUSDT", name: "Polkadot", defaultPrice: 1.1, defaultChange: -1.5 },
  { symbol: "BCH", pair: "BCHUSDT", name: "Bitcoin Cash", defaultPrice: 345, defaultChange: 0.8 },
  { symbol: "PEPE", pair: "PEPEUSDT", name: "Pepe", defaultPrice: 4e-6, defaultChange: 6.1 },
  { symbol: "SHIB", pair: "SHIBUSDT", name: "Shiba Inu", defaultPrice: 54e-7, defaultChange: -0.4 },
  { symbol: "TRX", pair: "TRXUSDT", name: "TRON", defaultPrice: 0.342, defaultChange: 1.3 },
  { symbol: "APT", pair: "APTUSDT", name: "Aptos", defaultPrice: 8.95, defaultChange: 2.8 },
  { symbol: "RENDER", pair: "RENDERUSDT", name: "Render", defaultPrice: 6.75, defaultChange: 3.1 },
  { symbol: "UNI", pair: "UNIUSDT", name: "Uniswap", defaultPrice: 7.45, defaultChange: -1.1 },
  { symbol: "AAVE", pair: "AAVEUSDT", name: "Aave", defaultPrice: 165, defaultChange: 2.4 },
  { symbol: "INJ", pair: "INJUSDT", name: "Injective", defaultPrice: 21.4, defaultChange: -0.5 }
];
var cachedLivePrices = null;
async function queryBinancePrices() {
  return new Promise((resolve, reject) => {
    const pairs = LIVE_TICKERS_CONFIG.map((c) => c.pair);
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(pairs))}`;
    const req = import_https2.default.get(
      url,
      { headers: { "User-Agent": "CryptoTicker/1.0" }, timeout: 4e3 },
      (res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Binance returned ${res.statusCode}`));
        }
        let body = "";
        res.on("data", (chunk) => body += chunk);
        res.on("end", () => {
          try {
            const arr = JSON.parse(body);
            if (!Array.isArray(arr)) {
              return reject(new Error("Invalid response format"));
            }
            const mapByPair = /* @__PURE__ */ new Map();
            arr.forEach((item) => {
              if (item && item.symbol) {
                mapByPair.set(item.symbol, item);
              }
            });
            const results = LIVE_TICKERS_CONFIG.map((cfg) => {
              const liveData = mapByPair.get(cfg.pair);
              if (liveData) {
                const price = parseFloat(liveData.lastPrice);
                const changePct = parseFloat(liveData.priceChangePercent);
                const high = parseFloat(liveData.highPrice);
                const low = parseFloat(liveData.lowPrice);
                const volume = parseFloat(liveData.quoteVolume || liveData.volume);
                return {
                  symbol: cfg.symbol,
                  name: cfg.name,
                  priceUsd: isNaN(price) ? cfg.defaultPrice : price,
                  change24hPct: isNaN(changePct) ? cfg.defaultChange : parseFloat(changePct.toFixed(2)),
                  high24h: isNaN(high) ? void 0 : high,
                  low24h: isNaN(low) ? void 0 : low,
                  volume24hUsd: isNaN(volume) ? void 0 : volume,
                  lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
                };
              }
              return {
                symbol: cfg.symbol,
                name: cfg.name,
                priceUsd: cfg.defaultPrice,
                change24hPct: cfg.defaultChange,
                lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
              };
            });
            resolve(results);
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on("error", (err) => reject(err));
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Binance request timeout"));
    });
  });
}
app.get("/api/live-prices", async (req, res) => {
  const now = Date.now();
  if (cachedLivePrices && now - cachedLivePrices.timestamp < 1e4) {
    return res.json({
      prices: cachedLivePrices.data,
      updatedAt: new Date(cachedLivePrices.timestamp).toISOString(),
      source: "binance-live"
    });
  }
  try {
    const livePrices = await queryBinancePrices();
    cachedLivePrices = {
      data: livePrices,
      timestamp: now
    };
    res.json({
      prices: livePrices,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      source: "binance-live"
    });
  } catch (err) {
    const fallbackPrices = LIVE_TICKERS_CONFIG.map((cfg) => ({
      symbol: cfg.symbol,
      name: cfg.name,
      priceUsd: cfg.defaultPrice,
      change24hPct: cfg.defaultChange,
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
    }));
    res.json({
      prices: cachedLivePrices?.data || fallbackPrices,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      source: cachedLivePrices ? "binance-live" : "fallback-engine"
    });
  }
});
app.get("/api/market-overview", async (req, res) => {
  try {
    const liveBtc = await getLiveBtcPrice();
    const macroOverview = {
      btcDominance: 57.8,
      btcDominanceTrend: "Above 55% \u2014 BTC is the safe play (Altseason requires <55% breakdown)",
      fearAndGreedIndex: 42,
      fearAndGreedLabel: "Fear (Selective Accumulation Zone)",
      stablecoinLiquidityUsd: 1845e8,
      stablecoinGrowth30dPct: 2.1,
      btcPriceUsd: liveBtc,
      btcChange24hPct: -0.9,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    res.json(macroOverview);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch market overview" });
  }
});
app.get("/api/search-coins", async (req, res) => {
  const query = (req.query.q || "").toUpperCase().trim();
  const allCoins = Object.values(DEFAULT_COIN_DATABASE).map((c) => ({
    ticker: c.ticker,
    name: c.name,
    sector: c.sector
  }));
  if (!query) {
    return res.json(allCoins);
  }
  const filtered = allCoins.filter(
    (c) => c.ticker.includes(query) || c.name.toUpperCase().includes(query)
  );
  if (filtered.length === 0 && query.length >= 2 && query.length <= 12) {
    const meta = resolveCoinMetadata(query);
    filtered.push({
      ticker: meta.ticker,
      name: meta.name,
      sector: meta.sector
    });
  }
  res.json(filtered);
});
function assembleInstitutionalReport(meta, liveStats, btcPrice, aiAnalysis) {
  const currentPriceUsd = liveStats.priceUsd;
  const priceChange24hPct = liveStats.change24hPct;
  const priceBtc = Number((currentPriceUsd / btcPrice).toFixed(8));
  const marketCapUsd = liveStats.marketCapUsd || Math.round(currentPriceUsd * meta.circulatingSupply);
  const levels = calculateDynamicLevels(currentPriceUsd, liveStats.high24h, liveStats.low24h);
  const chartData = generateChartData(currentPriceUsd, priceBtc);
  const circulatingPct = meta.maxSupply ? Math.min(100, Math.round(meta.circulatingSupply / meta.maxSupply * 100)) : 85;
  let defaultVerdict = "Buy";
  let defaultVerdictReasoning = "";
  if (meta.mvrv > 2.2 || circulatingPct < 30) {
    defaultVerdict = "Wait";
    defaultVerdictReasoning = `Elevated MVRV valuation (${meta.mvrv}) and pending token unlock dilution warrant waiting for an entry closer to immediate support ($${levels.immediateSupport}).`;
  } else if (priceChange24hPct < -3.5) {
    defaultVerdict = "Hold";
    defaultVerdictReasoning = `Relative strength is consolidating under BTC Dominance (57.8%). Hold existing core position and accumulate in tranches near $${levels.immediateSupport}.`;
  } else {
    defaultVerdict = "Buy";
    defaultVerdictReasoning = `Attractive risk/reward ratio (${((levels.breakoutTarget - currentPriceUsd) / Math.max(1e-4, currentPriceUsd - levels.immediateSupport)).toFixed(1)}:1). Strong network health, sustained developer velocity, and constructive price structure above $${levels.immediateSupport}.`;
  }
  const verdict = aiAnalysis?.verdict || defaultVerdict;
  const verdictReasoning = aiAnalysis?.verdictReasoning || defaultVerdictReasoning;
  const executiveSummary = aiAnalysis?.executiveSummary || `${meta.name} (${meta.ticker}) is trading at $${currentPriceUsd >= 1 ? currentPriceUsd.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : currentPriceUsd} (${priceChange24hPct >= 0 ? "+" : ""}${priceChange24hPct}% 24h) with a market capitalization of $${(marketCapUsd / 1e9).toFixed(2)}B USD. As a major asset in the ${aiAnalysis?.sector || meta.sector} space, ${meta.ticker} provides: ${aiAnalysis?.problemSolved || meta.problemSolved}`;
  const upsidePct = Math.round((levels.breakoutTarget - currentPriceUsd) / currentPriceUsd * 100);
  const drawdownPct = Math.round((currentPriceUsd - levels.majorFloor) / currentPriceUsd * 100);
  const rawMarkdown = `# INSTITUTIONAL RESEARCH: ${meta.name} (${meta.ticker})
**Date**: ${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}  
**Current Price**: $${currentPriceUsd >= 1 ? currentPriceUsd.toLocaleString() : currentPriceUsd} (${priceChange24hPct >= 0 ? "+" : ""}${priceChange24hPct}%)  
**Coin/BTC Ratio**: ${priceBtc} BTC  
**Market Cap**: $${(marketCapUsd / 1e9).toFixed(2)}B USD  

---

## Executive Summary
${executiveSummary}

---

## Layer 1 \u2014 Macro & Market Sentiment (The Wind)
* **BTC Dominance (BTC.D)**: 57.8% (Elevated). BTC remains the primary liquidity sink. Altcoins require selective capital deployment.
* **Fear & Greed Index**: 42 (Fear). Markets are cautious \u2014 institutional rule: "Buy in Fear (below 30-45), caution in Greed (above 70)".
* **Stablecoin Liquidity**: $184.5B total USDT/USDC market cap (+2.1% 30d expansion). Fresh fiat inflows support high-liquidity assets.

---

## Layer 2 \u2014 Fundamentals (The Engine)
* **Sector & Utility**: ${aiAnalysis?.sector || meta.sector}.
* **Problem Solved**: ${aiAnalysis?.problemSolved || meta.problemSolved}
* **Competitive Moat**: ${aiAnalysis?.competitiveMoat || meta.competitiveMoat}
* **Tokenomics**: ${(meta.circulatingSupply / 1e6).toFixed(1)}M circulating (${circulatingPct}% of total). ${meta.unlockWarning || "No imminent high-dilution cliff unlocks."}

---

## Layer 3 \u2014 On-Chain Data (The Truth)
* **Network Health**: ${meta.networkType} \u2014 ${meta.networkValue}.
* **Transaction Activity**: ~${meta.dailyTransactions.toLocaleString()} daily transactions across ${meta.activeAddresses.toLocaleString()} active addresses.
* **MVRV Ratio**: ${meta.mvrv} (Fair Value Zone).

---

## Layer 4 \u2014 Technical Analysis (The Entry)
* **Immediate Support**: $${levels.immediateSupport}
* **Major Floor**: $${levels.majorFloor}
* **Primary Resistance**: $${levels.primaryResistance}
* **Breakout Target**: $${levels.breakoutTarget} (+${upsidePct}% upside)

---

## Verdict: ${verdict.toUpperCase()}
${verdictReasoning}
`;
  return {
    id: `report-${meta.ticker.toLowerCase()}-${Date.now()}`,
    ticker: meta.ticker,
    coinName: meta.name,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    currentPriceUsd,
    priceChange24hPct,
    marketCapUsd,
    verdict,
    verdictReasoning,
    executiveSummary,
    layer1: {
      btcDominance: {
        percentage: 57.8,
        trend: "rising",
        implication: "Above 55% means BTC is the safe play. Altseason requires dominance breakdown."
      },
      fearAndGreed: {
        index: 42,
        label: "Fear",
        implication: "Buy in Fear (below 45), exercise caution in Greed (above 70)."
      },
      stablecoinLiquidity: {
        trend: "growing",
        usdtUsdcMarketCapChange30d: 2.1,
        implication: "Growing stablecoin caps signify real liquidity entering the market."
      },
      summaryText: aiAnalysis?.layer1Summary || `Macro liquidity favors quality assets; BTC dominance at 57.8% indicates selective altcoin accumulation is optimal.`
    },
    layer2: {
      tokenomics: {
        circulatingSupply: meta.circulatingSupply,
        maxSupply: meta.maxSupply,
        circulatingPercentage: circulatingPct,
        inflationRisk: circulatingPct > 75 ? "Low" : circulatingPct > 45 ? "Medium" : "High",
        unlockWarning: meta.unlockWarning
      },
      utility: {
        sector: aiAnalysis?.sector || meta.sector,
        problemSolved: aiAnalysis?.problemSolved || meta.problemSolved,
        competitiveMoat: aiAnalysis?.competitiveMoat || meta.competitiveMoat
      },
      developerActivity: {
        commits30d: meta.commits30d,
        githubStars: meta.githubStars,
        contributorCount: meta.contributors,
        velocityScore: Math.min(95, Math.round(meta.commits30d / 5)),
        assessment: aiAnalysis?.developerAssessment || "Consistent active protocol commits and developer engagement over the past 30 days."
      },
      socialDominance: {
        sentiment: aiAnalysis?.socialSentiment || (priceChange24hPct > 5 ? "Over-hyped" : "Balanced"),
        score: Math.min(90, Math.max(30, Math.round(50 + priceChange24hPct * 2))),
        commentary: aiAnalysis?.socialCommentary || "Organic builder and community attention without extreme speculative froth."
      },
      summaryText: aiAnalysis?.layer2Summary || `Strong fundamental foundation in the ${aiAnalysis?.sector || meta.sector} sector with ${circulatingPct}% of supply in circulation.`
    },
    layer3: {
      networkHealth: {
        metricType: meta.networkType,
        metricValue: meta.networkValue,
        healthScore: 88,
        status: "Robust",
        commentary: aiAnalysis?.networkCommentary || `Sustained security and validator engagement: ${meta.networkValue}.`
      },
      transactionActivity: {
        dailyTransactions: meta.dailyTransactions,
        activeAddresses: meta.activeAddresses,
        trend30d: "Increasing",
        commentary: aiAnalysis?.transactionCommentary || `Averaging ~${meta.dailyTransactions.toLocaleString()} daily transactions with steady active user retention.`
      },
      exchangeFlows: {
        flowType: "Accumulation (Outflows)",
        netFlowAmountUSD: -285e5,
        commentary: aiAnalysis?.flowCommentary || `Net exchange outflows indicate accumulation by long-term holders into self-custody.`
      },
      mvrvRatio: {
        ratio: meta.mvrv,
        zone: meta.mvrv < 1 ? "Undervalued (<1)" : meta.mvrv < 2.5 ? "Fair Value (1-2.5)" : "Overheated (>2.5)",
        commentary: aiAnalysis?.mvrvCommentary || `MVRV at ${meta.mvrv} indicates fair valuation well below cycle peaks.`
      },
      summaryText: aiAnalysis?.layer3Summary || `Healthy on-chain activity with ${meta.networkValue} and constructive network utilization.`
    },
    layer4: {
      priceStructure: {
        currentPriceUsd,
        high90d: levels.high90d,
        low90d: levels.low90d,
        high1y: levels.high1y,
        low1y: levels.low1y,
        trendStructure: priceChange24hPct > 0 ? "Making Higher Highs" : "Range-Bound",
        commentary: aiAnalysis?.trendCommentary || `Asset is consolidating with structural support at $${levels.immediateSupport} and primary resistance at $${levels.primaryResistance}.`
      },
      relativeStrength: {
        coinBtcRatio: priceBtc,
        ratioTrend30d: priceChange24hPct > 0 ? "Outperforming BTC" : "In-Line with BTC",
        ratioChangePct: priceChange24hPct,
        warningFlag: priceChange24hPct > 0 && priceBtc < 1e-5,
        commentary: aiAnalysis?.relativeStrengthCommentary || `Coin/BTC ratio stands at ${priceBtc} BTC. Tracking broader market beta.`
      },
      keyLevels: {
        immediateSupport: levels.immediateSupport,
        majorFloor: levels.majorFloor,
        primaryResistance: levels.primaryResistance,
        breakoutTarget: levels.breakoutTarget
      },
      volumeProfile: {
        behavior: "Declining on Pullbacks (Bullish)",
        commentary: aiAnalysis?.volumeCommentary || `Selling volume compresses into support zones with expansion on resistance tests.`
      },
      chartData,
      summaryText: aiAnalysis?.layer4Summary || `Technical structure remains intact above $${levels.immediateSupport} support with upside expansion target at $${levels.breakoutTarget}.`
    },
    scenarios: {
      bullish: {
        type: "Bullish Continuation",
        triggerOrRange: `Daily break and close above $${levels.primaryResistance} resistance with volume expansion`,
        targetOrDurationOrFloor: `$${levels.breakoutTarget} (+${upsidePct}% upside)`,
        probabilityPct: 55,
        description: aiAnalysis?.bullishScenario || `Sustained breakout above $${levels.primaryResistance} targets cycle extension toward $${levels.breakoutTarget}.`
      },
      neutral: {
        type: "Neutral/Consolidation",
        triggerOrRange: `Range consolidation between $${levels.immediateSupport} and $${levels.primaryResistance}`,
        targetOrDurationOrFloor: `2 to 5 weeks duration during Bitcoin dominance plateau`,
        probabilityPct: 30,
        description: aiAnalysis?.neutralScenario || `Sideways accumulation above $${levels.immediateSupport} allowing moving averages to compress.`
      },
      bearish: {
        type: "Bearish Retest",
        triggerOrRange: `Daily close below immediate support at $${levels.immediateSupport}`,
        targetOrDurationOrFloor: `Support floor at $${levels.majorFloor} (-${drawdownPct}% drawdown)`,
        probabilityPct: 15,
        description: aiAnalysis?.bearishScenario || `Loss of $${levels.immediateSupport} triggers institutional liquidity sweep to major floor at $${levels.majorFloor}.`
      }
    },
    dcaPlan: {
      entries: [
        {
          levelName: "Entry Tranche 1 (Market VWAP Pullback)",
          priceUsd: formatPriceNumber(currentPriceUsd * 0.98),
          allocationPct: 50,
          condition: "Enter on initial intraday dip toward VWAP"
        },
        {
          levelName: "Entry Tranche 2 (Immediate Support Limit)",
          priceUsd: levels.immediateSupport,
          allocationPct: 50,
          condition: "Limit order at key structural support"
        }
      ],
      exits: [
        {
          targetName: "TP1 (Primary Resistance)",
          priceUsd: levels.primaryResistance,
          sellPct: 35,
          catalyst: "De-risk initial capital at key supply zone"
        },
        {
          targetName: "TP2 (Breakout Target)",
          priceUsd: levels.breakoutTarget,
          sellPct: 40,
          catalyst: "Take profits on cycle breakout expansion"
        },
        {
          targetName: "TP3 (Trend Runner)",
          priceUsd: formatPriceNumber(levels.breakoutTarget * 1.22),
          sellPct: 25,
          catalyst: "Trail stop-loss below 20-day moving average"
        }
      ],
      riskRewardRatio: Number(((levels.breakoutTarget - currentPriceUsd) / Math.max(1e-4, currentPriceUsd - levels.immediateSupport)).toFixed(2)),
      strategyNotes: aiAnalysis?.dcaStrategyNotes || `Scale in across two tranches to average entry near $${formatPriceNumber((currentPriceUsd + levels.immediateSupport) / 2)}. Invalidation stop placed below $${levels.majorFloor}.`
    },
    criticalPitfalls: {
      coinBtcRatioWarning: `Always monitor the ${meta.ticker}/BTC ratio (${priceBtc} BTC). A coin rising in USD but dropping in BTC is underperforming Bitcoin.`,
      btcMacroBreakdownRule: `Do not execute aggressive altcoin buys if Bitcoin is breaking down from its macro support floor. Bitcoin dictates market beta.`,
      tokenUnlockDilutionAlert: meta.unlockWarning ? `ALERT: ${meta.unlockWarning} Always monitor supply unlocks \u2014 dilution destroys shareholder value.` : `Check regular vesting schedules and foundation grants for ${meta.ticker} before taking leveraged positions.`,
      mandatoryDisclaimer: `This report is for informational research only and does not constitute financial or investment advice. Always conduct your own due diligence (DYOR).`
    },
    rawMarkdownReport: rawMarkdown
  };
}
async function queryGeminiInstitutionalAnalysis(meta, currentPrice, change24hPct, btcPrice, customContext) {
  const ai = getGenAI();
  if (!ai) return null;
  const prompt = `You are a Chief Crypto Investment Analyst conducting a rigorous 4-layer institutional due diligence report on ${meta.name} (${meta.ticker}).

Market Data Context:
- Current Live Price: $${currentPrice} USD
- 24h Change: ${change24hPct}%
- Live Bitcoin Price: $${btcPrice} USD
- Coin/BTC Ratio: ${(currentPrice / btcPrice).toFixed(8)} BTC
- Sector: ${meta.sector}
- Known Tokenomics: Circulating ~${(meta.circulatingSupply / 1e6).toFixed(1)}M tokens (${meta.maxSupply ? (meta.maxSupply / 1e6).toFixed(1) + "M max" : "uncapped"})
- Macro Conditions: BTC Dominance 57.8% (above 55% threshold), Fear & Greed Index 42 (Fear), Stablecoin Supply $184.5B (+2.1% 30d).
${customContext ? `User Custom Instructions/Questions: "${customContext}"` : ""}

Framework to execute:
Layer 1: Macro & Market Sentiment (The Wind)
Layer 2: Fundamentals (The Engine) - Tokenomics, core utility, competitive moat, developer activity
Layer 3: On-Chain Data (The Truth) - Network health, active addresses, exchange flows, MVRV valuation
Layer 4: Technical Analysis (The Entry) - Key levels, trend structure, volume behavior

Return a strict JSON object with these exact keys:
{
  "verdict": "Buy" | "Hold" | "Wait",
  "verdictReasoning": "1-2 concise institutional sentences explaining why Buy, Hold, or Wait.",
  "executiveSummary": "A 2-paragraph high-level institutional summary specifically about ${meta.name} (${meta.ticker}), its market status, and investment thesis.",
  "sector": "${meta.sector}",
  "problemSolved": "Specific real problem ${meta.name} solves.",
  "competitiveMoat": "Specific competitive advantages and moat against rivals.",
  "developerAssessment": "Assessment of developer velocity and GitHub engagement.",
  "socialCommentary": "Assessment of sentiment and social hype.",
  "layer1Summary": "1-2 sentences on macro alignment with BTC Dominance and liquidity.",
  "layer2Summary": "1-2 sentences on fundamentals, tokenomics, and dilution risk.",
  "layer3Summary": "1-2 sentences on network activity and on-chain health.",
  "layer4Summary": "1-2 sentences on price trend, support/resistance, and entry timing.",
  "bullishScenario": "Specific bullish catalyst and trajectory for ${meta.ticker}.",
  "neutralScenario": "Specific consolidation range and duration expectation.",
  "bearishScenario": "Specific downside risks and drawdown support floor.",
  "dcaStrategyNotes": "Specific disciplined accumulation advice for an investor."
}`;
  const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });
      if (response.text) {
        return JSON.parse(response.text);
      }
    } catch (err) {
      const msg = err?.message || String(err);
      if (!msg.includes("503") && !msg.includes("high demand")) {
        console.warn(`Model ${model} note:`, msg.slice(0, 120));
      }
    }
  }
  return null;
}
app.post("/api/analyze", async (req, res) => {
  const { ticker, coinName, customContext } = req.body;
  if (!ticker) {
    return res.status(400).json({ error: "Ticker is required" });
  }
  try {
    const meta = resolveCoinMetadata(ticker, coinName);
    const [liveStats, btcPrice] = await Promise.all([
      fetchOnlineCoinStats(meta.ticker, meta.defaultPrice),
      getLiveBtcPrice()
    ]);
    let aiAnalysis = null;
    try {
      aiAnalysis = await queryGeminiInstitutionalAnalysis(
        meta,
        liveStats.priceUsd,
        liveStats.change24hPct,
        btcPrice,
        customContext
      );
    } catch (aiErr) {
      console.warn("Gemini analysis generation error, using dynamic analytical engine:", aiErr);
    }
    const report = assembleInstitutionalReport(meta, liveStats, btcPrice, aiAnalysis);
    res.json(report);
  } catch (error) {
    console.error("Error generating analysis report:", error);
    res.status(500).json({ error: "Failed to generate crypto analysis report" });
  }
});
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Crypto Investment Analyst server running on http://0.0.0.0:${PORT}`);
  });
}
setupServer();
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map

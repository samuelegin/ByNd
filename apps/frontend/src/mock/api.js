const delay = (ms) => new Promise((res) => setTimeout(res, ms));


//.Admin dashboard data

const dashboardData = {
  stewardshipDaysRemaining: 47,
  daoReadinessScore: 68,
  communityOwnership: 48,

  members: [
    { address: "0x742d...5f3a", joined: "2024-01-15", reputation: 850, sbtLevel: 3, role: "Verified Member" },
    { address: "0x893b...2e4c", joined: "2024-01-20", reputation: 620, sbtLevel: 2, role: "Contributor" },
    { address: "0x1a2f...9d7b", joined: "2024-02-01", reputation: 410, sbtLevel: 2, role: "Contributor" },
    { address: "0x5c3e...4f1a", joined: "2024-02-10", reputation: 350, sbtLevel: 1, role: "Member" },
    { address: "0x9f1a...8b2d", joined: "2024-03-05", reputation: 720, sbtLevel: 3, role: "Verified Member" },
    { address: "0x3e8b...1f9a", joined: "2024-03-20", reputation: 580, sbtLevel: 2, role: "Contributor" },
  ],

  proposals: [
    {
      id: 1,
      title: "Increase Treasury Funding to 50k USDC",
      type: "Funding",
      status: "Active",
      proposer: "0x742d...5f3a",
      votes: { for: 68, against: 12, required: 95 },
      deadline: "2025-11-25"
    },
    {
      id: 2,
      title: "Add Telegram as Official Channel",
      type: "Platform Link",
      status: "Voting",
      proposer: "0x893b...2e4c",
      votes: { for: 54, against: 8, required: 80 },
      deadline: "2025-11-20"
    },
    {
      id: 3,
      title: "Host Virtual Web3 Workshop",
      type: "Event",
      status: "Passed",
      proposer: "0x1a2f...",
      votes: { for: 92, against: 3, required: 95 },
      deadline: "2025-11-10"
    },
  ],

  roleDistribution: [
    { role: "Verified Member", count: 12, color: "#10b981" },
    { role: "Contributor", count: 45, color: "#3b82f6" },
    { role: "Member", count: 70, color: "#8b5cf6" },
  ],

  platformLinks: [
    { platform: "Discord", members: 127, status: "linked" },
    { platform: "Telegram", members: 89, status: "pending" },
    { platform: "Twitter/X", members: 215, status: "proposed" },
    { platform: "Reddit", members: 0, status: "proposed" },
    { platform: "LinkedIn", members: 0, status: "proposed" },
  ],

  riskSignals: [],
};

//mock functions
const mockPlatformStats = { totalCommunities: 247, totalMembers: 12458 };

const mockCommunities = [
  { id: 1, name: "Quintess DAO", category: "Developers", members: 127, image: "/images/QuintessDAO.jpg" },
  { id: 2, name: "Web3 Africa", category: "DeFi", members: 89, image: "/images/web3africa.jpg" },
  { id: 3, name: "Binance Africa", category: "DeFi", members: 53, image: "/images/binanceafrica.jpg" },
];

const mockMembers = [
  { address: "0x742d...5f3a", joined: "2024-01-15", tokens: 3, role: "Core" },
  { address: "0x893b...2e4c", joined: "2024-01-20", tokens: 2, role: "Contributor" },
  { address: "0x1a2f...9d7b", joined: "2024-02-01", tokens: 1, role: "Member" },
  { address: "0x5c3e...4f1a", joined: "2024-02-10", tokens: 2, role: "Contributor" },
];

const mockProposals = [
  { id: 1, title: "Increase Treasury Fund", status: "Active", votes: { for: 45, against: 12 }, deadline: "2024-03-15" },
  { id: 2, title: "Web3 Guild Partnership", status: "Active", votes: { for: 38, against: 8 }, deadline: "2024-03-20" },
  { id: 3, title: "Workshop Budget Approval", status: "Passed", votes: { for: 52, against: 5 }, deadline: "2024-02-28" },
];

const mockSoulbounds = [
  { community: "QuintessDAO", type: "Membership", issueDate: "2024-01-15" },
  { community: "Binance Africa", type: "Contribution", issueDate: "2024-12-30" },
  { community: "Web3 Africa", type: "Event", issueDate: "2024-12-30" },
];

const mockVerifiedDaos = [
  { id: 1, name: "Quintess DAO", role: "Member" },
  { id: 2, name: "Binance Africa", role: "Contributor" },
  { id: 3, name: "Web3 Africa", role: "Event Participant" },
];

const opportunities = [
  { id: 1, title: "Community Moderator", dao: "MetaDAO", type: "Volunteer", duration: "3 months", reward: "500 USDC + SBT", requirements: ["Active community member", "Discord experience", "Available 10h/week"], category: "community" },
  { id: 2, title: "Smart Contract Auditor", dao: "SecureDAO", type: "Paid", duration: "1 month", reward: "2000 USDC", requirements: ["Solidity expertise", "Security audit experience", "Portfolio required"], category: "technical" },
  { id: 3, title: "Social Media Manager", dao: "GrowthDAO", type: "Paid", duration: "6 months", reward: "1500 USDC/month", requirements: ["Marketing experience", "Content creation", "Analytics skills"], category: "marketing" },
  { id: 4, title: "Grant Reviewer", dao: "FundingDAO", type: "Bounty", duration: "Ongoing", reward: "100 USDC per review", requirements: ["Project evaluation experience", "Technical background", "Time commitment"], category: "governance" },
  { id: 5, title: "Ambassador Program Lead", dao: "GlobalDAO", type: "Paid", duration: "12 months", reward: "3000 USDC/month + Equity", requirements: ["Leadership experience", "Community building", "Global network"], category: "community" },
];

//exports
export const getPlatformStats = async () => {
  await delay(300);
  return mockPlatformStats;
};

export const getCommunities = async () => {
  await delay(500);
  const saved = JSON.parse(localStorage.getItem("mock_communities") || "[]");
  return [...mockCommunities, ...saved];
};

export const fetchCommunities = async () => {
  await delay(300);
  return [
    { name: "Quintess DAO", role: "Member", joined: "2024-01-15" },
    { name: "Binance Africa", role: "Contributor", joined: "2024-02-20" },
    { name: "Web3 Africa", role: "Member", joined: "2024-03-12" },
  ];
};

export const fetchSoulbounds = async () => {
  await delay(300);
  return mockSoulbounds;
};

export const fetchReputation = async () => {
  await delay(300);
  return { score: 65, contributions: 8 };
};

export const getProposals = async () => {
  await delay(500);
  return mockProposals;
};

export const getCommunityMembers = async (communityId) => {
  await delay(500);
  return mockMembers;
};

export const verifyWallet = async () => {
  await delay(500);
  return { verified: true };
};

export const verifyWalletWithWebacy = async (walletAddress) => {
  await delay(800);
  const verified = ["0x742d...5f3a", "0x893b...2e4c"].includes(walletAddress);
  return { verified, riskScore: verified ? 20 : 60 };
};

export const getUserProfile = async (walletAddress) => {
  await delay(400);
  const user = mockMembers.find((m) => m.address === walletAddress);
  return user || { address: walletAddress, role: "Guest", tokens: 0 };
};

export const getWallet = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  }
  return "0x724d...5f3a";
};

export const verifyOtp = async (otp) => {
  await delay(500);
  return otp === "123456";
};

export const issueSbtLegacy = async (wallet) => {
  await delay(300);
  return {
    community: "Afriknot Member",
    type: "Membership",
    issueDate: new Date().toISOString().split("T")[0],
    wallet,
  };
};

export const getVerifiedDaos = async (wallet) => {
  await delay(500);
  return mockVerifiedDaos;
};

export const joinDao = async (wallet, daoId) => {
  await delay(300);
  return { success: true, daoId };
};

export const getOpportunities = async () => {
  await delay(400);
  return opportunities;
};

export const getOpportunitiesByCategory = async (category) => {
  await delay(400);
  return category === "all" ? opportunities : opportunities.filter((opp) => opp.category === category);
};

export const saveCommunity = async (data) => {
  await delay(400);
  const existing = JSON.parse(localStorage.getItem("mock_communities") || "[]");
  const newCommunity = { id: existing.length + mockCommunities.length + 1, ...data };
  existing.push(newCommunity);
  localStorage.setItem("mock_communities", JSON.stringify(existing));
  return newCommunity;
};

export const issueSbt = async ({ community, platform, adminWallet }) => {
  await delay(300);
  return {
    community,
    platform,
    type: "Admin Verification",
    adminWallet,
    issueDate: new Date().toISOString().split("T")[0],
  };
};
export default dashboardData;
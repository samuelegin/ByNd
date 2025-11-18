import { useEffect, useState } from "react";
import { getPlatformStats } from "../mock/api";
import "../style.css";

export default function Home() {
  const [stats, setStats] = useState({ totalCommunities: 0, totalMembers: 0 });

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));

    getPlatformStats().then(setStats);
  }, []);

  return (
    <div className="container">
      <div className="hero reveal">
        <h1>Bynd Connect Your Community to the Blockchain</h1>
        <p>
         Bynd is a social layer for onboarding Web3 communities from web2 platforms and giving them an identity onchain, these communities evolve to DAO's later on 
        </p>
        <button className="connect-community">
          <a href="/connect-community">Connect your community</a>
        </button>
      </div>

      <div className="stat-display reveal">
        <div>
          <h1>{stats.totalCommunities}</h1>
          <p>Communities Onboarded</p>
        </div>
        <div>
          <h1>{stats.totalMembers}</h1>
          <p>Active Members</p>
        </div>
      </div>

      <div className="onchain-explainer reveal">
        <h2>Why Bynd?</h2>
        <p>
          Most Web3 communities exist on social platforms that aren't onchain, that gap is bridged by giving onchain identities to web3 communities that are connected to Bynd.
        </p>
      </div>

      <div className="info-div reveal">
        <h1>How it works</h1>
        <div className="info-cont">
          {[
            {
              step: "1. Community Admin Connects",
              desc: "Admins verify ownership and create an on-chain identity for their community.",
            },
            {
              step: "2. Members Join Onchain",
              desc: "Members connect wallets and receive membership Soulbound Tokens.",
            },
            {
              step: "3. Build Reputation",
              desc: "Earn SBTs for contributions, events, and community roles.",
            },
            {
              step: "4. Access Opportunities",
              desc: "Use your verified reputation to access DAO governance and Web3 opportunities.",
            },
          ].map((item, i) => (
            <div className="info" key={i}>
              <div className="info-header">{item.step}</div>
              <div className="info-text">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>
          Powered by <strong>Base</strong> | © {new Date().getFullYear()} Afriknot
        </p>
      </footer>
    </div>
  );
}

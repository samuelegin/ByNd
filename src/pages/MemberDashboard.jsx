import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCommunities, fetchSoulbounds, fetchReputation } from "../mock/api";
import "../style.css";

export default function MemberDashboard() {
  const [wallet, setWallet] = useState("");
  const [communities, setCommunities] = useState([]);
  const [soulbounds, setSoulbounds] = useState([]);
  const [reputation, setReputation] = useState({ score: 0, contributions: 0 });

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
  }, []);

  useEffect(() => {
    async function getWallet() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWallet(accounts[0]);
      } else {
        setWallet("0x724d...5f3a");
      }
    }

    async function fetchData() {
      const comm = await fetchCommunities();
      setCommunities(comm);

      const sbts = await fetchSoulbounds();
      setSoulbounds(sbts);

      const rep = await fetchReputation();
      setReputation(rep);
    }

    getWallet();
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="member-dashboard-header reveal">
        <h1>Member Profile</h1>
        <span className="connected-wallet">
          {wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
        </span>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-left">
          {/* Communities Joined */}
          <div className="communities-joined reveal">
            <h3>Communities Joined</h3>
            {communities.map((c, i) => (
              <div className="dashboard-communities" key={i}>
                <div className="community-info">
                  <div className="community-name">{c.name}</div>
                  <div className="community-info-ii">
                    <span className="member-status">{c.role} .</span>
                    <span className="community-date-info">
                      Joined <span className="date-joined">{c.joined}</span>
                    </span>
                  </div>
                </div>
                <div className="community-status">{c.role}</div>
              </div>
            ))}
          </div>

          {/* Soulbound Tokens */}
          <div className="soulbound-tokens reveal">
            <h2>Soulbound Tokens</h2>
            <div className="sbt-container">
              {soulbounds.map((sbt, i) => (
                <Link to="" key={i}>
                  <div className="sbt-card">
                    <div className="sbt-details">
                      <h3 className="community-name">{sbt.community}</h3>
                      <div className="sbt-type">{sbt.type}</div>
                      <div className="issue-date-cont">
                        Issued: <span className="issue-date">{sbt.issueDate}</span>
                      </div>
                    </div>
                    <div className="sbt-img">
                      <img src="./mocksbt.jpeg" alt="sbt" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Reputation + Actions */}
        <div className="dashboard-right">
          <div className="reputation-card-cont reveal">
            <h3>Reputation Score</h3>
            <div className="score-container">
              <span className="score">{reputation.score}</span>/
              <span className="overall-rep-score">100</span>
            </div>
            <div className="rep-score-guage">
              <div className="guage" style={{ width: `${reputation.score}%` }}></div>
            </div>
            <p>
              Based on <span className="number-of-contributions">{reputation.contributions}</span> Verified Contributions
            </p>
          </div>

          <div className="dao-actions-cont reveal">
            <h3>Actions</h3>
            <div className="dao-actions-card-cont">
              <div className="dao-actions-card">
                <Link to="/dao-opportunites">View Dao Opportunites</Link>
              </div>
              <div className="dao-actions-card">
                <Link to="">Join Community</Link>
              </div>

              <Link to="/admin-dashboard" className="dao-actions-card">Admin Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

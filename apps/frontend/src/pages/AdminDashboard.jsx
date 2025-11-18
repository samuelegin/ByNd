import { useState } from "react";
import mockAPI from "../mock/api";
import "../style.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const {
    stewardshipDaysRemaining,
    daoReadinessScore,
    communityOwnership,
    members,
    proposals,
    roleDistribution,
    platformLinks,
    riskSignals,
  } = mockAPI;

  const handleCreateProposal = (type) => {
    alert(`Proposal Requires Community Approval: ${type}`);
  };

  const getOwnershipStage = (percentage) => {
    if (percentage < 33) return { stage: "Steward-Led", color: "gray" };
    if (percentage < 51) return { stage: "Co-Governed", color: "orange" };
    if (percentage < 80) return { stage: "Community-Led", color: "green" };
    return { stage: "DAO-Enabled", color: "green" };
  };

  const ownershipStage = getOwnershipStage(communityOwnership);

  const tabs = ["Overview", "Members", "Roles", "Governance", "Platforms", "Identity", "Safeguards"];

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-text">
          <h1>Binance Africa</h1>
          <p>Community Stewardship Panel</p>
        </div>
        <span className="ownership-badge">{ownershipStage.stage}</span>
      </header>

      <main className="admin-main">
        {/* Key Metrics */}
        <div className="metrics-container">
          <div className="metric-card">
            <h3>DAO Readiness Score</h3>
            <p>{daoReadinessScore}%</p>
            <div className="gauge-container">
              <div className="gauge" style={{ width: `${daoReadinessScore}%` }}></div>
            </div>
            <small>
              {daoReadinessScore < 50
                ? "Early Stage"
                : daoReadinessScore < 75
                ? "Maturing"
                : "Ready for Full DAO"}
            </small>
          </div>

          <div className="metric-card">
            <h3>  Admin Term Remaining</h3>
            <p>{stewardshipDaysRemaining} days</p>
            <div className="gauge-container">
              <div className="gauge" style={{ width: `${(stewardshipDaysRemaining / 365) * 100}%` }}></div>
            </div>
            <small>Renewal requires community vote</small>
          </div>

          <div className="metric-card">
            <h3>Community Ownership</h3>
            <p>{communityOwnership}%</p>
            <div className="gauge-container">
              <div className="gauge" style={{ width: `${communityOwnership}%` }}></div>
            </div>
            <small>
              {communityOwnership < 51 ? "Admin rights active" : "Community-governed"}
            </small>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tab-buttons">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? "active-tab" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {/* Overview Tab */}
            {activeTab === "Overview" && (
              <div className="overview-grid">
                <div className="overview-card">
                  <h3>Community Health</h3>
                  <p>Transparent analytics not controlled</p>
                  <ul>
                    <li>Total Members <strong>127</strong></li>
                    <li>Active Proposals <strong>8</strong></li>
                    <li>SBT Adoption Rate <strong>73%</strong></li>
                    <li>Monthly Engagement <strong className="green-text">+24%</strong></li>
                  </ul>
                </div>
                <div className="overview-card">
                  <h3>Next Milestones</h3>
                  <p>Your community is evolving</p>
                  <div className="overview-stat-cont">
                    <div className="overview-stat">
                      <h4>50% SBT Adoption</h4>
                      <p> Unlocked: Community voting</p>
                    </div>

                    <div className="overview-stat">
                      <h4>75% SBT Adoption</h4>
                      <p>Next: Enable Treasury DAO</p>
                    </div>

                    <div className="overview-stat">
                      <h4>100% Community Owned </h4>
                      <p>Full DAO mode</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === "Members" && (
              <div className="members-tab">
                <h4>Community Members</h4>
                <p>View only- Roles assigned by Reputation and SBTs</p>
                {members.map((member) => (
                  <div key={member.address} className="member-card">
                    <div className="member-info">
                      <p className="member-address">{member.address}</p>
                      <small>Joined: {member.joined}</small>
                    </div>
                    <div className="member-status">
                      <p>Reputation: <strong>{member.reputation}</strong></p>
                      <div className="member-tags">
                        <span className="member-sbt-badge">SBT Level {member.sbtLevel}</span>
                        <span className="role-badge">{member.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Roles Tab */}
            {activeTab === "Roles" && (
              <div className="roles-tab">
                <h4>Role Distribution</h4>
                <p>Automatically assigned based on reputation, SBT's and Community voting</p>
                {roleDistribution.map((item) => (
                  <div key={item.role} className="role-bar-container">
                    <div className="role-label">
                      <span>{item.role}</span>
                      <span>{item.count} members</span>
                    </div>
                    <div className="role-bar-bg">
                      <div
                        className="role-bar-fill"
                        style={{ width: `${(item.count / 127) * 100}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
                <p className="role-note">
                  Role changes require community proposals and voting. Admins cannot directly assign roles.
                </p>
              </div>
            )}

            {/* Governance Tab */}
            {activeTab === "Governance" && (
              <div className="governance-tab">
                <div className="governance-header">
                  <div className="governance-header-sect">
                    <h4>Community Proposals</h4>
                    <p>Proposal based governance system</p>
                  </div>
                  <button onClick={() => handleCreateProposal("general")} className="create-btn">
                    Create Proposal
                  </button>
                </div>
                <div className="proposals-list">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="proposal-card">
                      <div className="proposals-cont-flex">
                      <h5>{proposal.title}</h5>                        
                      <p className="proposal-small">Proposed by: {proposal.proposer}</p>                        
                      </div>
                      <p className="proposal-info">
                        Type: {proposal.type} • Status: <strong>{proposal.status}</strong>
                      </p>
                      <div className="progress-wrapper">
                        <div className="flex-between">
                          <span>Votes</span>
                          <span>{proposal.votes.for + proposal.votes.against} / {proposal.votes.required}</span>
                        </div>
                        <progress
                          value={((proposal.votes.for + proposal.votes.against) / proposal.votes.required) * 100}
                          max="100"
                        />
                      </div>
                      <p className="proposal-small">Ends: {proposal.deadline}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Platforms Tab */}
            {activeTab === "Platforms" && (
              <div className="platforms-tab">
                <h4>Platform Links</h4>
                <p>Platform linking requires community approval</p>
                <div className="platforms-grid">
                  {platformLinks.map((platform) => (
                    <div key={platform.platform} className="platform-card">
                      <div className="platform-info">
                        <div>
                          <h5>{platform.platform}</h5>
                          <p>{platform.members} members</p>
                        </div>
                        <div>
                          {platform.status === "linked" && <span className="status-badge green">Linked</span>}
                          {platform.status === "pending" && <span className="status-badge yellow">Voting</span>}
                          {platform.status === "proposed" && (
                            <button
                              onClick={() => handleCreateProposal("platform link")}
                              className="create-btn small-btn"
                            >
                              Propose Link
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="linking-info">
                  Platform linking requires 3+ contributors to approve. This prevents centralized control
                </div>
              </div>
            )}

            {/* Identity Tab */}
            {activeTab === "Identity" && (
              <div className="identity-tab">
                <div className="identity-grid">
                 <h4>SBT Distribution</h4>
                 <p>Community Identity Progresion</p>
                 <div className="identity-cont">
                    <div className="identity">
                        <span>  Total SBT's Issued</span>
                        <span>127</span>
                    </div>
                    <div className="identity">
                        <span>  Level 1</span>
                        <span>28</span>
                    </div>
                    <div className="identity">
                        <span>Level 2</span>
                        <span>52</span>
                    </div>
                    <div className="identity">
                        <span>Level 3</span>
                        <span>28</span>
                    </div>
                 </div>
                </div>
                <div className="identity-info-card">
                  <h4>Identity System</h4>
                  <span>
                    <h5>Automated Minting</h5>
                    SBTs minted when members verify through platforms
                  </span>
                  <span>
                    <h5>Reputation-Based Upgrades</h5>
                    SBT levels increase based on contribution milestones and engagements
                  </span>
                  <span> 
                    <h5>No Manual Control</h5>
                    Admins cannot mint/revoke SBT's, this ensures a decentralized governance
                  </span>
                </div>
              </div>
            )}

            {/* Safeguards Tab */}
           { activeTab === "Safeguards" && (
              <div className="safeguards-tab">
                <h4>Security Signals</h4>
                {riskSignals.length === 0 ? (
                  <div className="no-risk">
                    <p>No risk signals detected</p>
                    <p>Community is healthy and secure</p>
                  </div>
                ) : (
                  <div className="risk-list">
                    {riskSignals.map((signal, i) => (
                      <div key={i} className="risk-card">
                        <p className="risk-type">{signal.type}</p>
                        <p>Address: {signal.address}</p>
                        <p>Severity: <strong>{signal.severity}</strong></p>
                        <p>Date: {signal.date}</p>
                      </div>
                    ))}
                  </div>
                )}
                <p className="risk-note">
                  Stewards can flag suspicious activity but cannot ban users. Community governance handles moderation.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

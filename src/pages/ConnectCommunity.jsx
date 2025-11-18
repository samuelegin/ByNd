import React, { useState, useEffect } from "react";
import "../style.css";
import { verifyWallet, saveCommunity, issueSbt, getCommunities, getWallet } from "../mock/api";


const platforms = [
  { name: "WhatsApp", color: "#25D366", bot: "https://wa.me/1234567890" },
  { name: "Telegram", color: "#0088cc", bot: "https://t.me/your_bot" },
  { name: "Discord", color: "#5865F2", bot: "https://discord.com/api/oauth2/authorize?client_id=OUR_BOT_ID" },
  { name: "X (Twitter)", color: "#000000", bot: "https://twitter.com/messages/compose?recipient_id= OUR_BOT_ID" },
  { name: "Reddit", color: "#FF4500", bot: "https://www.reddit.com/message/compose?to=OUR_BOT" },
  { name: "GitHub", color: "#24292e", bot: "https://github.com/apps/our-bot" },
];

export default function ConnectCommunity() {
  const [step, setStep] = useState(1);

  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletStatusText, setWalletStatusText] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    platform: "",
    invite: "",
    country: "",
    description: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationType, setVerificationType] = useState("otp");
  const [otpInput, setOtpInput] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const [inviteLink, setInviteLink] = useState("");
  const [sbtIssued, setSbtIssued] = useState(null);

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
    return () => observer.disconnect();
  }, []);

  const handleConnectWallet = async () => {
    setWalletStatusText("Verifying wallet...");
    try {
      const res = await verifyWallet();
      if (res && res.verified) {
        const addr = res.address || ("0x" + Math.random().toString(16).substring(2, 10) + "..." );
        setWalletConnected(true);
        setWalletAddress(addr);
        setWalletStatusText("Wallet connected and verified!");

        setTimeout(() => setStep(2), 700);
      } else {
        setWalletStatusText("Wallet verification failed");
      }
    } catch (err) {
      setWalletStatusText("Verification error: " + (err.message || err));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!walletConnected) {
      alert("Please connect and verify wallet first!");
      return;
    }
    if (!formData.platform) {
      alert("Please select a platform.");
      return;
    }

    const code = `BYND-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setVerificationCode(code);
    const needsCode = ["Discord", "Reddit", "X (Twitter)"].includes(formData.platform);
    setVerificationType(needsCode ? "code" : "otp");

    const saved = await saveCommunity({
      name: formData.name,
      platform: formData.platform,
      invite: formData.invite,
      country: formData.country,
      description: formData.description,
      adminWallet: walletAddress,
      verified: false,
      createdAt: new Date().toISOString(),
    });

    setVerificationStatus(needsCode 
      ? "Please post the verification code in your community (or follow the bot instructions)." 
      : "An OTP has been (mock) sent to your platform account."
    );

    setStep(3);
  };

  const handleVerifyOwnership = async () => {
    if (verificationType === "otp" && otpInput.trim().length < 6) {
      setVerificationStatus("Please enter the 6-digit OTP.");
      return;
    }

    setVerificationStatus("Verifying ownership...");
    setTimeout(async () => {
      const sbt = await issueSbt({
        community: formData.name || "community",
        platform: formData.platform,
        adminWallet: walletAddress,
      });

      const link = `${window.location.origin}/join?community=${encodeURIComponent(formData.name || "community")}&t=${Date.now()}`;
      setInviteLink(link);
      setSbtIssued(sbt);

      const communities = await getCommunities();
      if (communities && communities.length) {
        const last = communities[communities.length - 1];
        last.verified = true;
        last.issuedSbt = sbt;
        localStorage.setItem("mock_communities", JSON.stringify(communities));
      }

      setVerificationStatus("Verification successful! Admin SBT issued.");
      setStep(4);
    }, 1200);
  };

  const copyText = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      setVerificationStatus("Copied to clipboard");
      setTimeout(() => setVerificationStatus(""), 1200);
    } catch {
      setVerificationStatus("Copy failed");
    }
  };

  const handlePlatformSelect = (platformName) => {
    setFormData((p) => ({ ...p, platform: platformName }));
    setModalOpen(false);
    setVerificationStatus(`Platform selected: ${platformName}`);
  };

  return (
    <div className="container">

      <header className="cc-header reveal">
        <h1>Link your community, become verified Onchain</h1>
        <p>Verify your ownership and bring your community on-chain</p>
      </header>

      <section className="form reveal">
        {/* Guide steps */}
        <div className="guide-container">
          <div className={`guide ${step === 1 ? "guide-active" : ""}`}>
            <span className={step === 1 ? "active-guide-no" : "guide-no"}>1</span>
            <div className={step >= 1 ? "guide-text" : "text-muted"}>Connect Wallet</div>
          </div>

          <div className={`guide ${step === 2 ? "guide-active" : ""}`}>
            <span className={step === 2 ? "active-guide-no" : "guide-no"}>2</span>
            <div className={step >= 2 ? "guide-text" : "text-muted"}>Fill Community Form</div>
          </div>

          <div className={`guide ${step === 3 ? "guide-active" : ""}`}>
            <span className={step === 3 ? "active-guide-no" : "guide-no"}>3</span>
            <div className={step >= 3 ? "guide-text" : "text-muted"}>Verify Ownership</div>
          </div>

          <div className={`guide ${step === 4 ? "guide-active" : ""}`}>
            <span className={step === 4 ? "active-guide-no" : "guide-no"}>4</span>
            <div className={step >= 4 ? "guide-text" : "text-muted"}>Issue Admin SBT</div>
          </div>
        </div>

        <div className="guide-sync">
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h5>Step 1: Connect Your Wallet</h5>
              <p className="info-text">Your wallet represents your community's admin identity.</p>

              <button
                type="button"
                className={`connect-wallet ${walletConnected ? "connected" : ""}`}
                onClick={handleConnectWallet}
              >
                {walletConnected ? `Connected: ${walletAddress}` : "Connect Wallet"}
              </button>

              {walletStatusText && <p className="status-text">{walletStatusText}</p>}
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmitForm}>
              <h4>Step 2: Fill Community Details</h4>

              <label>Community Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., QuintessDAO"
                required
              />

              <label>Platform</label>
              <button type="button" className="link-platform-button" onClick={() => setModalOpen(true)}>
                {formData.platform ? `Connected via ${formData.platform}` : "Select Platform"}
              </button>

              <label>Group Invite Link</label>
              <input
                type="url"
                name="invite"
                value={formData.invite}
                onChange={handleInputChange}
                placeholder="https://..."
                required
              />

              <label>Country / Region</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="e.g., Nigeria"
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Briefly describe your community's purpose and activites"
                rows="4"
                required
              />

              <button type="submit" className="connect-wallet">Continue to Verification</button>
            </form>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="verify-cont">
              <h3>Step 3: Verify Ownership</h3>

              {verificationType === "otp" ? (
                <>
                  <p className="info-text">An OTP has been sent to your {formData.platform} account. Enter it below to verify ownership.</p>
                  <label>One-Time Password</label>
                  <input
                    id="otp"
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                  />
                  <button className="verify-otp" onClick={handleVerifyOwnership} disabled={otpInput.length < 6}>
                    Verify Ownership
                  </button>
                </>
              ) : (
                <>
                  <p className="info-text">Post the following code in your community description or as a pinned message for verification.</p>

                  <div className="sec-verificstion-cont">
                    <label className="sec-desc">VERIFICATION CODE</label>
                    <div className="copy-verification-code">{verificationCode}</div>
                    <button type="button" className="verify-otp-2" onClick={() => copyText(verificationCode)}>Copy Code</button>
                  </div>

                  <p className="sec-desc">Once posted, click the button below to verify</p>
                  <button className="connect-wallet" onClick={handleVerifyOwnership}>I've Posted It — Verify Now</button>
                </>
              )}

              {/* {verificationStatus && <p className="status-text">{verificationStatus}</p>} */}
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="text-center">
              <div className="success-sbt-cont">
                <div className="success-text" style={{ fontSize: 38 }}>✅</div>
                <h3>Verification Successful!</h3>
                <p className="info-text">Your community "{formData.name}" has been verified.</p>
              </div>

              <div className="sbt-onboarding-card">
                <div className="sbt-details-adm">
                  <div className="sbt-adm">
                    <h4 className="community-name">Admin SBT</h4>
                    <div className="sbt-type">Membership</div>
                  </div>
                  <div className="sbt-onboarding-img">
                  <div className="sbt-img" />
                </div>
                </div>
                <div className="issue-date-cont">
                  Issued: {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="sbt-community-details">
                <span>Community:</span> "{formData.name}" <br /><br />
                <span>Platform:</span>  "{formData.platform}" <br /><br />
                <span>Wallet:</span> "{walletAddress}" <br /><br />
                <span>Issued:</span> "{new Date().toLocaleDateString()}" <br />
              </div>

              <div className="member-invite-cont">
                <label className="invite-label">Member Invite Link</label>
                <div className="copy-link">
                  <input className="copy-disp" value={inviteLink} readOnly/>
                  <button className="platform-btn" onClick={() => copyText(inviteLink)}>Copy</button>
                </div>
              </div>

              <button className="connect-wallet" onClick={() => (window.location.href = "/admin-dashboard")}>View Your Dashboard</button>
            </div>
          )}
        </div>
      </section>

      {/* Platform modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select a Platform</h3>
            <p>Click a platform below to start verification via the platform bot or instructions.</p>

            <div className="platform-grid" style={{ marginTop: 12 }}>
              {platforms.map((p) => (
                <button
                  key={p.name}
                  className="platform-card"
                  type="button"
                  onClick={() => handlePlatformSelect(p.name)}
                  style={{ borderColor: p.color }}
                >
                  <div className="platform-circle" style={{ backgroundColor: p.color }} />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>

            <button className="close-modal" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
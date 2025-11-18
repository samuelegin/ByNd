import { useState, useEffect } from "react";
import { getWallet, verifyOtp, issueSbt, getCommunities } from "../mock/api";
import "../style.css";

export default function JoinCommunities() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [wallet, setWallet] = useState("");
  const [sbt, setSbt] = useState(null);
  const [showCommunities, setShowCommunities] = useState(false);
  const [communities, setCommunities] = useState([]);

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
    const currentStepEl = document.querySelector(`.guide-sync.step-${step}`);
    if (currentStepEl) currentStepEl.classList.add("active");
  }, [step]);

  const handleConnectWallet = async () => {
    const connectedWallet = await getWallet();
    setWallet(connectedWallet);
    setStep(2);
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return alert("Please enter a 6-digit OTP");
    const verified = await verifyOtp(otp);
    if (!verified) return alert("OTP verification failed");

    const issuedSbt = await issueSbt(wallet);
    setSbt(issuedSbt);
    setStep(3);

    setTimeout(async () => {
      const comms = await getCommunities();
      setCommunities(comms);
      setShowCommunities(true);
    }, 2000);
  };

  return (
    <div className="container">
      <header className="cc-header reveal">
        <h1>Join community, become verified Onchain</h1>
        <p>Verify yourself and get an identity on-chain</p>
      </header>

      <div className="community-connect-card">
        <div className="community-connect-details">
          <h4 className="">Binance Africa</h4>
          <p className="community-desc">binance community africa</p>
          <section>
            <span>
              Platform: <span className="active-community-platform">Telegram</span>
            </span> .
            <span className="members-no">500 members</span>
          </section>
        </div>
        <button className="connect-wallet">Connect Wallet</button>
        <p>Your wallet represents your Onchain Identity</p>
      </div>

      <div className="join-c-verify-cont">
        <h4>Verify your identity</h4>
        <p>An OTP has been sent to your contact via  
           <span className="active-community-platform">Telegram</span>
        </p>
        <label>One-Time Password</label>
        <input
          id="otp"
          type="text"
          placeholder="Enter 6-digit OTP"
          maxLength="6"
        />
        <button className="verify-otp">
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
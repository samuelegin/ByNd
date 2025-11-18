import { useState } from "react";
import { Link } from "react-router-dom";


function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [account, setAccount] = useState(null);

  const toggleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">ByNd</h1>

      <div className="nav-gen-cont">
          {/* NAV LINKS */}
          <div className={`nav-links ${isNavOpen ? "open" : ""}`}>
              <Link to="/">Home</Link>
              <Link to="/connect-community">Link Community</Link>
              <Link to="/join-communities">Join Community</Link>
              <Link to="/member-dashboard">Dashboard</Link>
            {/* CLOSE BUTTON (mobile) */}
            <button className="close-nav-btn" onClick={toggleMenu}>
              X
            </button>
          </div>

          <div className="nav-btn-cont">
              {/* CONNECT WALLET BUTTON */}
              <button className="nav-connect-wallet" onClick={connectWallet}>
                {account
                  ? `${account.slice(0, 6)}...${account.slice(-4)}`
                  : "Connect Wallet"}
              </button>
          </div>
      </div>
      {/* OPEN BUTTON (mobile) */}
      <button className="open-nav-btn" onClick={toggleMenu}>
        =
      </button>
    </nav>
  );
}

export default Navbar;

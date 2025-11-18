import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ConnectCommunity from "./pages/ConnectCommunity";
import JoinCommunities from "./pages/JoinCommunities";
import MemberDashboard from "./pages/MemberDashboard";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import "./style.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect-community" element={<ConnectCommunity />} />
        <Route path="/join-communities" element={<JoinCommunities />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

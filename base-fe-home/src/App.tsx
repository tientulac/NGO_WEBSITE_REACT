import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Campaign from "./pages/campaign/Campaign";
import DonateInfo from "./pages/donate-info/DonateInfo";
import Payment from "./pages/payment/Payment";
import Main from "./pages/Main";
import HomePage from "./pages/home/HomePage";
import CampaignDetail from "./pages/campaign-detail/CampaignDetail";
import CampaignPendingDetail from "./pages/campaign-pending-detail/CampaignPendingDetail";

const App: React.FC = () => {
  return (
    <Router>
      {/* Toast hiển thị toàn app */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="payment" element={<Payment />} />
          <Route path="campaign" element={<Campaign />} />
          <Route path="campaign-detail" element={<CampaignDetail />} />
          <Route path="campaign-pending-detail" element={<CampaignPendingDetail />} />
          <Route path="donate-info" element={<DonateInfo />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

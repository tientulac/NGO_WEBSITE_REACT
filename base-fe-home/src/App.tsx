import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import Campaign from "./pages/campaign/Campaign";
import DonateInfo from "./pages/donate-info/DonateInfo";

const App: React.FC = () => {
  return (
    <Router>
      {/* Toast hiển thị toàn app */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="campaign" element={<Campaign />} />
          <Route path="donate-info" element={<DonateInfo />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

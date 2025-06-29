import React from "react";
import Sidebar from "../layouts/SideBar";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { Outlet } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Panel */}
      <div className="main-panel">
        {/* Header */}
        <Header />
        <Outlet /> {/* Load content động ở đây */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

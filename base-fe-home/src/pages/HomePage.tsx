import React from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { Outlet } from "react-router-dom";

const HomePage: React.FC = () => {
  return (

    <div className="wrapper">
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

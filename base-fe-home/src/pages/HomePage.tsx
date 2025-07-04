import React from "react";
import Footer from "../layouts/main/footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "../layouts/main/header/Header";

const HomePage: React.FC = () => {
  return (

    <div className="wrapper">
      {/* Header */}
      <Header />
      <Outlet /> {/* Load content động ở đây */}
      <Footer />
    </div>
  );
};

export default HomePage;

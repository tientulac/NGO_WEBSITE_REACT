import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/footer/Footer";
import Header from "../layouts/header/Header";

const Main: React.FC = () => {
    return (

        <div className="wrapper">
            {/* Header */}
            <Header />
            <Outlet /> {/* Load content động ở đây */}
            <Footer />
        </div>
    );
};

export default Main;

import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page-content">
      {/* Banner */}
      <div className="home-banner d-flex align-items-left justify-content-center flex-column">
        <div className="title-banner">
          <span className="text-join-hand">JOIN HANDS TO BUILD A BETTER COMMUNITY!</span>{" "}<br></br>
          <span className="text-discover">Discover and support trustworthy charitable projects.</span>
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn-pink text-white px-4"
              onClick={() => navigate("/campaign")}
            >
              EXPLORE CAMPAIGN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

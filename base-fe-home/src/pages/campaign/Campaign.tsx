import React, { useState } from "react";
import "./Campaign.css";
import { useNavigate } from "react-router-dom";

const campaigns = [
  {
    title: 'Supporting students to go to school in 2025',
    image: 'https://i.vrace.com.vn/2025/03/24/Thumbnail5x31400x840px2-1742808133.png?w=860&h=0&q=100&dpr=1&rt=auto&g=no&s=hfXXGywkZPxNUdExOffbvw',
    raised: 9728000,
    goal: 20000000,
    status: 'RAISING',
  },
  {
    title: 'Oh, who saves my face?',
    image: 'https://i.vrace.com.vn/2025/03/24/Thumbnail5x31400x840px2-1742808133.png?w=860&h=0&q=100&dpr=1&rt=auto&g=no&s=hfXXGywkZPxNUdExOffbvw',
    raised: 9738000,
    goal: 30000000,
    status: 'RAISING',
  },
  {
    title: 'Green Forest Up 2025',
    image: 'https://i.vrace.com.vn/2025/03/24/Thumbnail5x31400x840px2-1742808133.png?w=860&h=0&q=100&dpr=1&rt=auto&g=no&s=hfXXGywkZPxNUdExOffbvw',
    raised: 9738000,
    goal: 30000000,
    status: 'RAISING',
  },
  {
    title: 'Please help Chang Thi Ha cure her serious illness.',
    image: 'https://i.vrace.com.vn/2025/03/24/Thumbnail5x31400x840px2-1742808133.png?w=860&h=0&q=100&dpr=1&rt=auto&g=no&s=hfXXGywkZPxNUdExOffbvw',
    raised: 9738000,
    goal: 30000000,
    status: 'RAISING',
  },
  {
    title: 'Please help Chang Thi Ha cure her serious illness.',
    image: 'https://i.vrace.com.vn/2025/03/24/Thumbnail5x31400x840px2-1742808133.png?w=860&h=0&q=100&dpr=1&rt=auto&g=no&s=hfXXGywkZPxNUdExOffbvw',
    raised: 9738000,
    goal: 30000000,
    status: 'PENDING',
    votesUpheld: 75,
    votesOpposed: 25,
    location: 'Hanoi, Vietnam',
    target: 0.45678,
  },
  {
    title: 'Please help Chang Thi Ha cure her serious illness.',
    image: 'https://i.vrace.com.vn/2025/03/24/Thumbnail5x31400x840px2-1742808133.png?w=860&h=0&q=100&dpr=1&rt=auto&g=no&s=hfXXGywkZPxNUdExOffbvw',
    raised: 9738000,
    goal: 30000000,
    status: 'PENDING',
    votesUpheld: 80,
    votesOpposed: 20,
    location: 'Ho Chi Minh City, Vietnam',
    target: 0.12345,
  },
  {
    title: 'Please help Chang Thi Ha cure her serious illness.',
    image: 'https://i.vrace.com.vn/2025/03/24/Thumbnail5x31400x840px2-1742808133.png?w=860&h=0&q=100&dpr=1&rt=auto&g=no&s=hfXXGywkZPxNUdExOffbvw',
    raised: 9738000,
    goal: 30000000,
    status: 'PENDING',
    votesUpheld: 90,
    votesOpposed: 10,
    location: 'Da Nang, Vietnam',
    target: 0.67890,
  },
  // Add ended campaigns here if needed
];

const formatCurrency = (value: number) =>
  value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const Campaign: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'RAISING' | 'ENDED' | 'PENDING'>('RAISING');
  const navigate = useNavigate();

  return (
    <div className="campaign-page">
      <div className="campaign-banner text-center text-white d-flex align-items-center justify-content-center flex-column">
        <h2 className="fw-bold text-white text-center">
          <span className="text-primary">Charity</span>{" "}
          <span className="text-pink">fundraising</span>{" "}
          <span className="text-info">campaign</span>
        </h2>
        <p className="fw-bold">CAMPAIGN LIST</p>
      </div>
      <div className="campaigns-container">
        <div className="tab-buttons">
          <button
            className={activeTab === 'RAISING' ? 'active' : ''}
            onClick={() => setActiveTab('RAISING')}
          >
            Campaign is raising funds
          </button>
          <button
            className={activeTab === 'PENDING' ? 'active' : ''}
            onClick={() => setActiveTab('PENDING')}

          >
            Campaign is pending
          </button>
          <button
            className={activeTab === 'ENDED' ? 'active' : ''}
            onClick={() => setActiveTab('ENDED')}
          >
            Campaign has ended
          </button>
        </div>

        <h2>{activeTab === 'RAISING' || activeTab === 'ENDED' ? 'Campaigns Currently Raising Funds' : 'Campaigns Pending'}</h2>
        <p>Choose to fight in the field that interests you most.</p>

        <div className={activeTab === 'RAISING' || activeTab === 'ENDED' ? 'campaign-list' : 'campaign-list-pending'}>
          {campaigns
            .filter((c) => c.status === activeTab)
            .map((campaign, index) => {
              const percent = (campaign.raised / campaign.goal) * 100;
              return (
                <div
                  key={index}
                  className={
                    activeTab === 'RAISING' || activeTab === 'ENDED'
                      ? 'campaign-card'
                      : 'campaign-card-pending'
                  }
                >
                  {(activeTab === 'RAISING' || activeTab === 'ENDED') ? (
                    <>
                      <div className="card-top">
                        <img src={campaign.image} alt={campaign.title} />
                        <div className="tag">Children</div>
                      </div>

                      <div className="floating-logo">
                        <img
                          src="https://png.pngtree.com/png-clipart/20200709/original/pngtree-charity-logo-design-template-png-image_3601919.jpg"
                          alt="icon"
                        />
                      </div>

                      <div className="card-bottom">
                        <div className="org-name">Quỹ Vì trẻ em khuyết tật Việt Nam</div>
                        <h4>{campaign.title}</h4>

                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="funds">
                          <span>{(campaign.raised / 1000).toLocaleString('vi-VN')}.000</span>
                          <span>{percent.toFixed(1)}%</span>
                        </div>

                        <div className="goal">
                          with the goal of {formatCurrency(campaign.goal)}
                        </div>

                        <a href="/campaign-detail" className="detail-link">
                          Detail →
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="campaign-card-pending">
                      <img src={campaign.image} alt={campaign.title} />
                      <div className="pending-content">
                        <div className="pending-left">
                          <div className="pending-title">{campaign.title}</div>
                          <div className="pending-vote">Votes upheld {campaign.votesUpheld}%</div>
                          <div className="pending-vote">Votes opposed {campaign.votesOpposed}%</div>
                          <div className="pending-location">
                            <i className="fas fa-map-marker-alt"></i> {campaign.location}
                          </div>
                        </div>
                        <div className="pending-right">
                          <div className="pending-target">Target<br />{campaign.target}</div>
                          <button className="view-details-btn"
                            onClick={() => navigate("/campaign-pending-detail")}
                          >VIEW DETAILS</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

        </div>
      </div>
    </div>
  );
};

export default Campaign;

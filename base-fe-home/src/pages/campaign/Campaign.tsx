import React, { useEffect, useState } from "react";
import "./Campaign.css";
import { useNavigate } from "react-router-dom";
import { Project } from "../../entities/project.entity";
import { BaseService } from "../../services/base.service";
import { toast } from "react-toastify";

const formatCurrency = (value: number) => {
  if (value > 0) {
    const valueFormat = Number(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return valueFormat;
  }
  return 0;
}


const Campaign: React.FC = () => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await BaseService.getList<Project[]>("/campaign/list");
        if (response.status === 200) {
          setData(response.data);
          console.log(response.data);
          setLoading(false);
        } else {
          toast.warning(response.message);
          setLoading(false);
        }
      } catch (err) {
        toast.warning("Internal server error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, []);

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
          {data
            .filter((c) => c.status?.toUpperCase() === activeTab.toUpperCase())
            .map((campaign, index) => {
              const percent = ((campaign.detail?.total_donat ?? 0) / (campaign.detail?.financial_goal ?? 1)) * 100;
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
                        <img src={campaign.thumbnail} alt={campaign.title} />
                        <div className="tag">Children</div>
                      </div>

                      <div className="floating-logo">
                        <img
                          src="https://png.pngtree.com/png-clipart/20200709/original/pngtree-charity-logo-design-template-png-image_3601919.jpg"
                          alt="icon"
                        />
                      </div>

                      <div className="card-bottom">
                        <div className="org-name">{campaign.name}</div>
                        <h4>{campaign.title}</h4>

                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="funds">
                          <span>{formatCurrency(Number(campaign.detail?.total_donat ?? 0))}</span>
                          <span>{percent.toFixed(1)}%</span>
                        </div>

                        <div className="goal">
                          with the goal of {formatCurrency(Number(campaign.detail?.financial_goal ?? 0))}
                        </div>

                        <a href={`/campaign-detail/${campaign.id}`} className="detail-link">
                          Detail →
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="campaign-card-pending">
                      <img src={campaign.thumbnail} alt={campaign.title} />
                      <div className="pending-content">
                        <div className="pending-left">
                          <div className="pending-title">{campaign.title}</div>
                          <div className="pending-vote">Agree: {campaign.feedbackReviews.filter(feedback => feedback.status?.toUpperCase() === "AGREE").length || 0}</div>
                          <div className="pending-vote">Reject: {campaign.feedbackReviews.filter(feedback => feedback.status?.toUpperCase() === "DISAGREE").length || 0}</div>
                          <div className="pending-location">
                            <i className="fas fa-map-marker-alt"></i> {campaign.detail?.address || ""}
                          </div>
                        </div>
                        <div className="pending-right">
                          <div className="pending-target">Target<br />{formatCurrency(Number(campaign.detail?.financial_goal || 0))}</div>
                          <button className="view-details-btn"
                            onClick={() => navigate("/campaign-pending-detail/" + campaign.id)}
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

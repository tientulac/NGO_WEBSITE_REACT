import React, { useState } from "react";
import "./CampaignPendingDetail.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

const CampaignPendingDetail: React.FC = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState<number>(5);
    const [hover, setHover] = useState<number>(5);
    const [showModal, setShowModal] = useState(false);

    const handleApprove = () => {
        Modal.confirm({
            title: "Approve/Reject",
            content: (
                <div>
                    <p>Are you sure about this?</p>
                    <TextArea
                        placeholder="Enter your reason..."
                        rows={4}

                    />
                </div>
            ), 
            okText: "Ok",
            okType: "primary",
            cancelText: "Cancel",
            onOk: async () => {
                setShowModal(false);
            },
            onCancel() {
                // không làm gì cả
            },
        });
    };

    return (
        <div className="campaign-pending-detail">
            {/* Banner */}
            <div className="campaign-pending-detail-banner text-center text-white d-flex align-items-center justify-content-center flex-column">
            </div>
            <div className="campaign-detail-container">
                <div className="campaign-header">
                    <p className="campaign-subtitle">Charity Fundraising</p>
                    <h3 className="campaign-org">Quỹ Vì trẻ em khuyết tật Việt Nam</h3>
                    <h1 className="campaign-title">
                        Please help Chang Thi Ha cure her serious illness.
                    </h1>
                </div>

                <div className="campaign-content-wrapper">
                    {/* Left content */}
                    <div className="campaign-content">
                        <p>
                            Every child has dreams and desires to study, to integrate and have companions on their journey to adulthood. But not all children have that opportunity, especially children with disabilities. If they do not go to school, they not only lose the opportunity to access knowledge, but also lose valuable opportunities to make friends and feel connected to the world around them. Loneliness, shyness and invisible barriers can keep them in their own world, while just one opportunity, one open door, can change their future and life. In 2025, the Fund will continue to coordinate with the Communist Youth Union of the Ministry of Foreign Affairs to implement this meaningful program with the goal of awarding 1,200 scholarships, each worth 4,000,000 VND. We are calling for a fundraiser of 200 million VND on the DonaTrust platform, equivalent to 50 scholarships, and will expand the call on other platforms to spread support to more disabled children.
                            The “Support to School” program of the Fund for Disabled Children not only provides material support and learning conditions for disabled children, but also gives them opportunities - opportunities to study, make friends, integrate and develop equally. Education is not just about letters, but also a bridge between dreams and building the values ​​of each individual. “Support to School” supports a learning journey, supports small hearts to open to the world, so that each child can find a friend, a dream and a brighter future.
                            The Foundation plans to award scholarships in August 2025, right before the start of the new school year, with the hope that these gifts will help children feel more confident on the path to conquering knowledge and dreams. Each of your supportive actions will open the door for more disabled children to a world full of love and opportunity.
                            We appreciate and are grateful for your contribution.
                        </p>

                        <h5 className="campaign-question">What do you know about this fundraising campaign?</h5>
                        <div className="campaign-feedback">
                            <textarea
                                placeholder="Please leave any additional information you know about this fundraising campaign..."
                            />
                            <button className="btn-send-icon" title="Send">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="send-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right vote box */}
                    <div className="vote-box">
                        <div className="vote-info">
                            <p><span>🕒</span> Time left to vote: <strong>17 days</strong></p>
                            <p>🎯 Target: <strong>200.000.000 VND</strong></p>
                        </div>

                        <div className="vote-progress">
                            <div className="vote-bar">
                                <div className="agree" style={{ width: "70%" }} />
                                <div className="disagree" style={{ width: "30%" }} />
                            </div>
                            <div className="vote-labels">
                                <span className="agree-label">Agree 70%</span>
                                <span className="disagree-label">Disagree 30%</span>
                            </div>
                        </div>

                        <p className="total-votes">🧮 Total 85 votes</p>
                        <p className="votes-detail">✅ 62 votes agree &nbsp;&nbsp; ❌ 13 votes disagree</p>

                        <div className="vote-comments">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="comment-box">
                                    <div className="comment-header">
                                        <input type="checkbox" name={`vote${i}`} />
                                        <span>Comment {i}</span>
                                    </div>
                                    <div className="stars">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                className={star <= (hover || rating) ? "star filled" : "star"}
                                                onClick={() => {
                                                    setRating(star);
                                                    console.log(star);
                                                }}
                                                onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(0)}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="vote-actions">
                            <button className="btn-agree" onClick={() => {
                                handleApprove();
                            }}>AGREE</button>
                            <button className="btn-disagree">DISAGREE</button>
                        </div>

                        <p className="report-flag">🚩 <a href="#">Flag / Report scam</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignPendingDetail;

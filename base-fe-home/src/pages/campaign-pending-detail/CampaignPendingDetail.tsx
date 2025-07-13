import React, { useEffect, useState } from "react";
import "./CampaignPendingDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { BaseService } from "../../services/base.service";
import { Project } from "../../entities/project.entity";
import { toast } from "react-toastify";

const calculateDaysLeft = (deadlineStr?: string | Date): number => {
    if (!deadlineStr) return 0;

    const now = new Date();
    const deadline = new Date(deadlineStr);

    // Chênh lệch mili giây
    const diffMs = deadline.getTime() - now.getTime();

    // Chuyển sang số ngày
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0; // Không âm
};

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

const CampaignPendingDetail: React.FC = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState<number>(5);
    const [hover, setHover] = useState<number>(5);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams(); // Lấy campaign id từ URL
    const [percent, setPercent] = useState<number>(0);
    const [data, setData] = useState<Project>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getList = async () => {
            try {
                const response = await BaseService.getList<Project>("/campaign/" + id);
                if (response.status === 200) {
                    setData(response.data);
                    console.log(response.data);
                    setPercent(Number(response.data.detail.total_donat) / Number(response.data.detail.financial_goal) * 100);
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
                    <h3 className="campaign-org">{data?.name}</h3>
                    <h1 className="campaign-title">
                        {data?.detail?.purpose}
                    </h1>
                </div>

                <div className="campaign-content-wrapper">
                    {/* Left content */}
                    <div className="campaign-content">
                        <p>
                            {data?.detail?.description}
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
                            <p><span>🕒</span> Time left to vote: <strong>{calculateDaysLeft(data?.deadline)} days</strong></p>
                            <p>🎯 Target: <strong>{formatCurrency(Number(data?.detail?.financial_goal ?? 0))}</strong></p>
                        </div>

                        <div className="vote-progress">
                            <div className="vote-bar">
                                <div className="agree" style={{ width: `${Number((data?.feedbackReviews?.filter(feedback => feedback.status?.toUpperCase() === "AGREE").length || 0)) / Number((data?.feedbackReviews?.length || 1)) * 100}%` }} />
                                <div className="disagree" style={{ width: `${Number((data?.feedbackReviews?.filter(feedback => feedback.status?.toUpperCase() === "DISAGREE").length || 0)) / Number((data?.feedbackReviews?.length || 1)) * 100}%` }} />
                            </div>
                            <div className="vote-labels">
                                <span className="agree-label">Agree {Number((data?.feedbackReviews?.filter(feedback => feedback.status?.toUpperCase() === "AGREE").length || 0)) / Number((data?.feedbackReviews?.length || 1)) * 100}%</span>
                                <span className="disagree-label">{Number((data?.feedbackReviews?.filter(feedback => feedback.status?.toUpperCase() === "DISAGREE").length || 0)) / Number((data?.feedbackReviews?.length || 1)) * 100}%</span>
                            </div>
                        </div>

                        <p className="total-votes">🧮 Total {data?.feedbackReviews?.length || 0} votes</p>
                        <p className="votes-detail">✅ {data?.feedbackReviews?.filter(feedback => feedback.status?.toUpperCase() === "AGREE").length || 0} votes agree &nbsp;&nbsp; ❌ {data?.feedbackReviews?.filter(feedback => feedback.status?.toUpperCase() === "DISAGREE").length || 0} votes disagree</p>

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

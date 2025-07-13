import React, { useEffect, useState } from "react";
import "./DonateInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import { Project } from "../../entities/project.entity";
import { BaseService } from "../../services/base.service";
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

const DonateInfo: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [blessing, setBlessing] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("datnguyentien1009@gmail.com");
    const [anonymous, setAnonymous] = useState(false);
    const quickAmounts = [50000, 100000, 200000, 500000];
    const navigate = useNavigate();
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

    return (
        <div className="donate-info-page">
            {/* Banner */}
            <div className="campaign-banner text-center text-white d-flex align-items-center justify-content-center flex-column">
                <h2 className="fw-bold text-white text-center">
                    <span className="text-primary">Charity</span>{" "}
                    <span className="text-pink">fundraising</span>{" "}
                    <span className="text-info">campaign</span>
                </h2>
                <p className="fw-bold">DONATION INFORMATION</p>
            </div>
            <div className="container py-5">
                <div className="row g-4">
                    {/* Campaign Summary */}
                    <div className="col-md-5">
                        <img
                            src={data?.thumbnail}
                            className="img-fluid rounded shadow"
                            alt="campaign"
                        />
                        <div className="bg-white mt-5 p-3 shadow-sm rounded border">
                            <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-shield-alt text-primary me-2"></i>
                                <strong>{data?.name}</strong>
                            </div>
                            <h5 className="fs-5 text-primary">
                                {data?.title}
                            </h5>
                            <div className="d-flex justify-content-between small text-muted">
                                <span className="fw-600">Campaign Objective</span>
                                <span className="fw-600">{formatCurrency(Number(data?.detail?.financial_goal ?? 0))}</span>
                            </div>
                            <div className="custom-progress mt-1">
                                <div className="custom-progress-bar" style={{ width: `${Number(data?.detail?.total_donat) / Number(data?.detail?.financial_goal) * 100}%` }}></div>
                            </div>
                            <div className="text-danger fw-bold mt-2">{formatCurrency(Number(data?.detail?.total_donat ?? 0))}</div>
                            <small className="text-muted">Achieved {Number(data?.detail?.total_donat) / Number(data?.detail?.financial_goal) * 100}%</small>
                            <div className="d-flex align-items-center mt-2 text-muted">
                                <i className="fas fa-clock me-2"></i>
                                <small>Time remaining <b>{calculateDaysLeft(data?.deadline)} days</b></small>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="col-md-7">
                        <div className="bg-donation p-4 rounded shadow-sm">
                            {/* Amount */}
                            <label className="form-label fw-semibold small">
                                Enter donation amount<span className="text-danger">*</span>
                            </label>
                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="form-control fw-bold text-primary"
                                />
                                <span className="input-group-text">VND</span>
                            </div>

                            {/* Quick amount buttons */}
                            <div className="mb-3 d-flex gap-2 flex-wrap">
                                {quickAmounts.map((amt) => (
                                    <button
                                        key={amt}
                                        type="button"
                                        className={`btn btn-outline-success btn-sm ${amount === amt ? "active" : ""}`}
                                        onClick={() => setAmount(amt)}
                                    >
                                        {amt.toLocaleString("vi-VN")}
                                    </button>
                                ))}
                            </div>

                            {/* Blessing */}
                            <label className="form-label fw-semibold small">Enter blessing</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter your love wishes..."
                                value={blessing}
                                onChange={(e) => setBlessing(e.target.value)}
                            />

                            {/* Your Info */}
                            <p className="fw-bold mb-2">YOUR INFORMATION</p>

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter fullname"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter number phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <small className="text-muted d-block mb-3">
                                You will receive a confirmation email regarding your contribution.
                            </small>

                            <div className="form-check mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={anonymous}
                                    onChange={() => setAnonymous(!anonymous)}
                                    id="anonymousCheck"
                                />
                                <label className="form-check-label small" htmlFor="anonymousCheck">
                                    I want to donate anonymously
                                </label>
                            </div>
                            <button
                                className="btn btn-primary w-100 fw-bold"
                                onClick={() => navigate("/payment")}
                            >
                                DONATE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateInfo;

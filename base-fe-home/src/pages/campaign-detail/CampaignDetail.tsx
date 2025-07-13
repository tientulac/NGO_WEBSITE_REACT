import React, { useEffect, useState } from "react";
import "./CampaignDetail.css";
import { FilterEntity } from "../../entities/components/filter.entity";
import { ColumnEntity } from "../../entities/components/column.entity";
import { DonateCampaignDetail } from "../../entities/donateCampaignDetail";
import Form from "antd/es/form";
import { renderFilterBar } from "../../components/FilterBar.component";
import { renderTable } from "../../components/Table.component";
import { useNavigate, useParams } from "react-router-dom";
import { Project } from "../../entities/project.entity";
import { BaseService } from "../../services/base.service";
import { toast } from "react-toastify";

const filters: FilterEntity[] = [
    {
        id: "donor",
        label: "Donor",
        typeControl: "input",
        placeholder: "",
        order: 1,
        isVisible: true,
    },
    {
        id: "status",
        label: "Status",
        typeControl: "select",
        options: [
            { key: "active", value: "Active" },
            { key: "inactive", value: "Cancle" },
        ],
        order: 2,
    },
];

const columns: ColumnEntity[] = [
    {
        id: "donor",
        label: "Donor",
        isSortable: true,
        isVisible: true,
        order: 1,
    },
    {
        id: "amount",
        label: "Amount",
        isSortable: true,
        isVisible: true,
        order: 2,
    },
    {
        id: "time",
        label: "Time",
        isSortable: true,
        isVisible: true,
        order: 2,
    },
];

const dataTable: DonateCampaignDetail[] = [
    {
        "donor": "Nguyễn Khánh Nam",
        "amount": "50.000đ",
        "time": "21:30:38 - 07/06/2025"
    },
    {
        "donor": "Nhà hảo tâm ẩn danh",
        "amount": "60.000đ",
        "time": "16:06:32 - 06/06/2025"
    },
    {
        "donor": "Trần Lan Anh",
        "amount": "10.000đ",
        "time": "15:42:04 - 06/06/2025"
    },
    {
        "donor": "Đinh Phước Lộc",
        "amount": "20.000đ",
        "time": "23:47:05 - 04/06/2025"
    },
    {
        "donor": "Nguyễn Khánh Nam",
        "amount": "50.000đ",
        "time": "08:56:38 - 04/06/2025"
    },
    {
        "donor": "TRẦN MINH THƯ",
        "amount": "10.000đ",
        "time": "07:54:46 - 03/06/2025"
    },
    {
        "donor": "Lưu Nguyễn Quỳnh Như",
        "amount": "50.000đ",
        "time": "22:27:12 - 02/06/2025"
    },
    {
        "donor": "Lê Trần Khánh Ngọc 2112153110",
        "amount": "50.000đ",
        "time": "23:41:34 - 01/06/2025"
    },
    {
        "donor": "Nguyễn Thị Ngọc Anh",
        "amount": "30.000đ",
        "time": "17:37:55 - 01/06/2025"
    },
    {
        "donor": "Nguyễn Khánh Nam",
        "amount": "50.000đ",
        "time": "10:00:39 - 31/05/2025"
    }
];

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

const CampaignDetail: React.FC = () => {
    const [rows, setRows] = useState<DonateCampaignDetail[]>(dataTable);
    const [loading, setLoading] = useState<boolean>(true);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [data, setData] = useState<Project>();
    const [percent, setPercent] = useState<number>(0);
    const { id } = useParams(); // Lấy campaign id từ URL

    useEffect(() => {
        const getList = async () => {
            try {
                const response = await BaseService.getList<Project>("/campaign/" + id);
                if (response.status === 200) {
                    setData(response.data);
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

    const handleSearch = async () => {
        const values = filters.reduce((acc, filter) => {
            acc[filter.id] = filter.value;
            return acc;
        }, {} as Record<string, any>);
        console.log(values);
    };

    return (
        <div className="campaign-detail-page">
            {/* Banner */}
            <div className="campaign-banner text-center text-white d-flex align-items-center justify-content-center flex-column">
                <h2 className="fw-bold text-white text-center">
                    <span className="text-primary">Charity</span>{" "}
                    <span className="text-pink">fundraising</span>{" "}
                    <span className="text-info">campaign</span>
                </h2>
                <p className="fw-bold">CAMPAIGN DETAIL</p>
            </div>

            {/* Content */}
            <div className="container py-5">
                <div className="row">
                    {/* Poster Image */}
                    <div className="col-md-5 mb-4">
                        <div className="position-relative">
                            <img
                                src={data?.thumbnail}
                                alt="Campaign Poster"
                                className="img-fluid rounded shadow"
                            />
                            <span className="badge bg-pink position-absolute top-0 end-0 m-2">Children</span>
                        </div>
                    </div>

                    {/* Campaign Info */}
                    <div className="col-md-7">
                        <h4 className="title-cam-detail text-primary">{data?.title}</h4>
                        <div className="bg-white shadow-sm p-3 rounded border">

                            {/* Tên tổ chức */}
                            <div className="d-flex align-items-center mb-3">
                                <i className="fas fa-shield-alt text-primary me-2"></i>
                                <span className="fs-5 fw-semibold">{data?.detail?.purpose || ""}</span>
                            </div>

                            {/* Mục tiêu */}
                            <div className="d-flex justify-content-between small text-muted mb-1">
                                <span className="fw-600">Campaign Objective</span>
                                <span className="fw-600">{formatCurrency(Number(data?.detail?.financial_goal ?? 0))}</span>
                            </div>

                            <div className="custom-progress">
                                <div className="custom-progress-bar" style={{ width: `${percent}%` }}></div>
                            </div>

                            {/* Số tiền đã đạt */}
                            <div className="d-flex justify-content-between align-items-center py-3">
                                <div className="d-flex flex-column align-items-start">
                                    <div className="d-flex align-items-center mb-1">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/64/64572.png" // hoặc icon nhóm
                                            alt="donations"
                                            width="20"
                                            height="20"
                                            className="me-2"
                                        />
                                        <span className="text-muted small fw-600">85 donations</span>
                                    </div>
                                    <div className="fw-600 text-muted">{data?.status}</div>
                                </div>
                                <div className="fs-5 fw-bold text-danger">
                                    {formatCurrency(Number(data?.detail?.total_donat ?? 0))}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">
                                {/* Time remaining */}
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1827/1827370.png" // icon đồng hồ
                                        alt="clock"
                                        width="24"
                                        height="24"
                                        className="me-2"
                                    />
                                    <div>
                                        <small className="text-muted">Time remaining</small>
                                        <div className="text-muted small fw-600">{calculateDaysLeft(data?.deadline)} days</div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="d-flex gap-3">
                                    <button
                                        className="btn-pink text-white px-4"
                                        onClick={() => navigate("/donate-info/" + data?.id)}
                                    >
                                        DONATE NOW
                                    </button>
                                    <button className="btn btn-primary px-4">SHARE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Campaign Description */}
                <div className="col-md-12 mt-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-round">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="row">
                                            <Form form={form} layout="vertical">
                                                {renderFilterBar(filters, handleSearch)}
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-4">
                            <div className="card card-round">
                                <div className="card-body">
                                    <div className="row">
                                        <Form form={form} layout="vertical" onFinish={handleSearch}>
                                            {renderTable({
                                                columns,
                                                rows,
                                                onEdit: () => {
                                                    console.log("Edit action triggered");
                                                },
                                                onDelete: () => {
                                                    console.log("Delete action triggered");
                                                },
                                                showActions: false,
                                            })}{" "}
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetail;

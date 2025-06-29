import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { FilterEntity } from "../../entities/components/filter.entity";
import { ColumnEntity } from "../../entities/components/column.entity";
import { Role } from "../../entities/role.entity";
import { renderFilterBar } from "../../components/FilterBar.component";
import { renderTable } from "../../components/Table.component";
import { useEffect, useState } from "react";
import { BaseService } from "../../services/base.service";

const filters: FilterEntity[] = [
  {
    id: "keyword",
    label: "Từ khóa",
    typeControl: "input",
    placeholder: "Nhập từ khóa...",
    order: 1,
    isVisible: true,
  },
  {
    id: "status",
    label: "Trạng thái",
    typeControl: "select",
    options: [
      { key: "active", value: "Kích hoạt" },
      { key: "inactive", value: "Ngừng" },
    ],
    order: 2,
  },
];

const columns: ColumnEntity[] = [
  {
    id: "code",
    label: "Mã",
    isSortable: true,
    isVisible: true,
    order: 1,
  },
  {
    id: "name",
    label: "Tên quyền",
    isSortable: true,
    isVisible: true,
    order: 2,
  },
];

const rows: Role[] = [
  {
    id: 1,
    code: "ADMIN",
    name: "Quản trị viên",
  },
  {
    id: 2,
    code: "USER",
    name: "Người dùng",
  },
];

const RolePage: React.FC = () => {
  const [rows, setRows] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [form] = Form.useForm();

  // useEffect(() => {
  //   const getList = async () => {
  //     try {
  //       const response = await BaseService.getList<Role[]>("/users");
  //       if (response.status === 200) {
  //         setRows(response.data);
  //         setLoading(false);
  //       } else {
  //         alert(response.message);
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       alert(err);
  //       setLoading(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getList();
  // }, []);

  const handleSearch = () => {
    const values = filters.reduce((acc, filter) => {
      acc[filter.id] = filter.value;
      return acc;
    }, {} as Record<string, any>);

    console.log("Giá trị tìm kiếm:", values);
  };

  const handleEdit = (record: Role) => {
    console.log("📝 Sửa:", record);
  };

  const handleDelete = (record: Role) => {
    console.log("🗑️ Xóa:", record);
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
          <div>
            <h3 className="fw-bold mb-3">Users /</h3>
            <h6 className="op-7 mb-2">Quản lý quyền</h6>
          </div>
          <div className="ms-md-auto py-2 py-md-0">
            <Button icon={<PlusOutlined />} iconPosition={"end"}>
              Thêm mới
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-body">
                <div className="row">
                  <div className="row">
                    <Form form={form} layout="vertical" onFinish={handleSearch}>
                      {renderFilterBar(filters)}
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-head-row card-tools-still-right">
                  <h5 className="card-title">Danh sách quyền</h5>
                  <div className="card-tools">
                    <button className="btn btn-icon btn-link btn-success btn-xs">
                      <span className="fa fa-file-excel"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <Form form={form} layout="vertical" onFinish={handleSearch}>
                    {renderTable({
                      columns,
                      rows,
                      onEdit: handleEdit,
                      onDelete: handleDelete,
                      showActions: true,
                    })}{" "}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePage;

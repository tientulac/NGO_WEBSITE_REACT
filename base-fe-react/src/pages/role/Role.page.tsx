import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { FilterEntity } from "../../entities/components/filter.entity";
import { ColumnEntity } from "../../entities/components/column.entity";
import { Role } from "../../entities/role.entity";
import { renderFilterBar } from "../../components/FilterBar.component";
import { renderTable } from "../../components/Table.component";
import { useEffect, useState } from "react";
import { BaseService } from "../../services/base.service";
import { toast } from 'react-toastify';

const filters: FilterEntity[] = [
  {
    id: "name",
    label: "Tên quyền",
    typeControl: "input",
    placeholder: "",
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

const RolePage: React.FC = () => {
  const [rows, setRows] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = Form.useForm();
  const [formSave] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  useEffect(() => {
    const getList = async () => {
      await handleSearch();
    };

    getList();
  }, []);

  const handleSearch = async () => {
    const values = filters.reduce((acc, filter) => {
      acc[filter.id] = filter.value;
      return acc;
    }, {} as Record<string, any>);
    console.log(values);

    try {
      const response = await BaseService.getList<Role[]>("/roles/list");
      if (response.status === 200) {
        setRows(response.data);
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

  const handleEdit = (record: Role) => {
    openEditModal(record);
  };

  const handleDelete = (record: Role) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa ?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await BaseService.post(`/roles/delete`, record);
          if (response.status === 200) {
            toast.success("Thành công");
            handleSearch();
          } else {
            toast.error(response.message);
          }
        } catch (err) {
          toast.error("Lỗi hệ thống");
        }
      },
      onCancel() {
        // không làm gì cả
      },
    });
  };

  const openAddModal = () => {
    setEditingRole(null);
    formSave.resetFields();
    setShowModal(true);
  };

  const openEditModal = (record: Role) => {
    setEditingRole(record);
    formSave.setFieldsValue(record);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const values = await formSave.validateFields();
      const response = await BaseService.post(`/roles/save`, values);
      if (response.status === 200) {
        toast.success("Thành công");
        handleSearch();
        setShowModal(false);
      } else {
        toast.error(response.message);
      }
      formSave.resetFields();
    } catch (error) {
      // Form lỗi
    }
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
            <Button
              icon={<PlusOutlined />}
              iconPosition={"end"}
              onClick={openAddModal}
            >
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
                    <Form form={form} layout="vertical">
                      {renderFilterBar(filters, handleSearch)}
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

      {/* MODAL */}
      <Modal
        title={editingRole ? "Cập nhật" : "Thêm mới"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          formSave.resetFields();
        }}
        onOk={handleSave}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={formSave} layout="vertical">
          <Form.Item
            name="id"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã"
            name="code"
            rules={[{ required: true, message: "Vui lòng nhập mã" }]}
          >
            <Input disabled={!!editingRole} />
          </Form.Item>

          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RolePage;

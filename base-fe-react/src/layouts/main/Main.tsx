import React from "react";
import { Form } from "antd";
import { Role } from "../../entities/role.entity";
import { FilterEntity } from "../../entities/components/filter.entity";
import { ColumnEntity } from "../../entities/components/column.entity";
import { renderFilterBar } from "../../components/FilterBar.component";
import { renderTable } from "../../components/Table.component";

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

const Main: React.FC = () => {
  const [form] = Form.useForm();

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
    <div style={{ padding: 24 }}>
      {/* FILTER BAR */}
      <h2>Điều kiện tìm kiếm</h2>
      <Form form={form} layout="vertical" onFinish={handleSearch}>
        {renderFilterBar(filters)}
      </Form>
      <h2>Danh sách</h2>
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
  );
};

export default Main;

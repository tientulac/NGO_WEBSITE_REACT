import React from "react";
import { Table, Button, Space, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ColumnEntity } from "../entities/components/column.entity";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface TableRendererProps {
  columns: ColumnEntity[];
  rows: any[];
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  showActions?: boolean;
}

export const renderTable = ({
  columns,
  rows,
  onEdit,
  onDelete,
  showActions = true,
}: TableRendererProps) => {
  const visibleColumns = columns
    .filter((c) => c.isVisible === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const antdColumns: ColumnsType<any> = visibleColumns.map((col) => ({
    title: col.label,
    dataIndex: col.id,
    key: col.id,
    sorter: col.isSortable
      ? (a, b) => {
          const aVal = a[col.id];
          const bVal = b[col.id];
          return typeof aVal === "string" && typeof bVal === "string"
            ? aVal.localeCompare(bVal)
            : aVal - bVal;
        }
      : undefined,
  }));

  if (showActions && (onEdit || onDelete)) {
    antdColumns.push({
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          {onEdit && (
            <Tooltip title="Sửa">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit(record)}
              />
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Xóa">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                onClick={() => onDelete(record)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    });
    return (
      <Table
        columns={antdColumns}
        dataSource={rows}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
      />
    );
  }
};

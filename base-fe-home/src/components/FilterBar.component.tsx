import {
  Form,
  Input,
  Select,
  Checkbox,
  DatePicker,
  Radio,
  Row,
  Col,
  Button,
} from "antd";
import { FilterEntity } from "../entities/components/filter.entity";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;

export const renderFilterBar = (
  filters: FilterEntity[],
  onSearch?: () => void
) => {
  const filterControls = filters
    .filter((f) => f.isVisible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .reduce<React.ReactNode[]>((acc, filter) => {
      const commonProps = {
        key: filter.id,
        name: filter.id,
        label: filter.label,
        rules: filter.required
          ? [{ required: true, message: `${filter.label} required` }]
          : undefined,
      };

      let control: React.ReactNode;

      switch (filter.typeControl) {
        case "input":
          control = (
            <Form.Item {...commonProps}>
              <Input
                placeholder={filter.placeholder}
                disabled={filter.disabled}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  filter.value = event.target.value;
                }}
                value={filter.value}
              />
            </Form.Item>
          );
          break;

        case "select":
          control = (
            <Form.Item {...commonProps}>
              <Select
                placeholder={filter.placeholder}
                mode={filter.multiple ? "multiple" : undefined}
                disabled={filter.disabled}
                showSearch={true}
                onChange={(value: any) => {
                  filter.value = value;
                }}
                allowClear
              >
                {(filter.options || []).map((opt: any) => (
                  <Option key={opt.key ?? opt.value} value={opt.key}>
                    {opt.label ?? opt.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
          break;

        case "checkbox":
          control = (
            <Form.Item {...commonProps} valuePropName="checked">
              <Checkbox disabled={filter.disabled}>
                {filter.placeholder || filter.label}
              </Checkbox>
            </Form.Item>
          );
          break;

        case "date":
          control = (
            <Form.Item {...commonProps}>
              <DatePicker
                placeholder={filter.placeholder}
                disabled={filter.disabled}
              />
            </Form.Item>
          );
          break;

        case "radio":
          control = (
            <Form.Item {...commonProps}>
              <Radio.Group disabled={filter.disabled}>
                {(filter.options || []).map((opt: any) => (
                  <Radio key={opt.key ?? opt.value} value={opt.value}>
                    {opt.label ?? opt.value}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          );
          break;

        default:
          return acc;
      }

      acc.push(
        <Col span={8} key={filter.id}>
          {control}
        </Col>
      );
      return acc;
    }, []);

  // Thêm nút Search ở dòng cuối cùng bên phải
  filterControls.push(
    <Col
      span={8}
      key="search-button"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <Form.Item>
        <Button onClick={onSearch} htmlType="submit" type="primary" icon={<SearchOutlined />} iconPosition={"end"}>
          Search
        </Button>
      </Form.Item>
    </Col>
  );

  return <Row gutter={16}>{filterControls}</Row>;
};

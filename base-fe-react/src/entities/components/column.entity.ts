export interface ColumnEntity {
  id: string;
  label: string;
  description?: string;
  isSortable?: boolean;
  isVisible?: boolean;
  width?: number;
  order?: number;
}

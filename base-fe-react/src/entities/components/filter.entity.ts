export interface FilterEntity {
  id: string;
  label: string;
  isVisible?: boolean;
  options?: Option[];
  value?: string;
  order?: number;
  typeControl?: "select" | "input" | "checkbox" | "date" | "radio";
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  multiple?: boolean;
}
export interface Option {
  key: string;
  value: string;
}

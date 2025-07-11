// models/base.model.ts
import { Model, CreationOptional } from "sequelize";

export class BaseModel<T extends {} = any, K extends {} = any> extends Model<
  T,
  K
> {
  declare created_at: Date | null;
  declare updated_at: Date | null;
  declare deleted_at: Date | null;
  declare created_by: string | null;
  declare updated_by: string | null;
  declare deleted_by: string | null;
}

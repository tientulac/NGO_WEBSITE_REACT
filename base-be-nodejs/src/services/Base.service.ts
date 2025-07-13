import { Model } from "sequelize";

export class BaseService<T, M extends Model> {
  constructor(private model: { new (): M } & typeof Model) {}

  getAll = async (): Promise<T[]> => {
    const records = await this.model.findAll();
    return records.map((r) => r.toJSON() as T);
  };

  findOne = async (fieldName: string, fieldValue: any): Promise<T | null> => {
    const whereClause = { [fieldName]: fieldValue };
    const record = await this.model.findOne({ where: whereClause });
    return record ? (record.toJSON() as T) : null;
  };
}

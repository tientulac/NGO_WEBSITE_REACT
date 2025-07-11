import { Model } from "sequelize";

export class BaseService<T, M extends Model> {
  constructor(private model: { new (): M } & typeof Model) {}

  getAll = async (): Promise<T[]> => {
    const records = await this.model.findAll();
    return records.map((r) => r.toJSON() as T);
  };
}

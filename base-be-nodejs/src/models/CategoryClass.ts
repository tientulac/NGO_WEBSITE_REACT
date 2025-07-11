// src/models/role.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection";
import { BaseModel } from "./BaseClass";

export class CategoryClass extends BaseModel {}

CategoryClass.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    parent_cate_id: DataTypes.NUMBER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    deleted_by: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "t_category",
    modelName: "Category",
    timestamps: false,
  }
);

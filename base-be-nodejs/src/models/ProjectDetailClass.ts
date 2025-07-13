// src/models/role.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection";
import { BaseModel } from "./BaseClass";

export class ProjectDetailClass extends BaseModel {}

ProjectDetailClass.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: DataTypes.NUMBER,
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    purpose: DataTypes.STRING,
    total_donat: DataTypes.NUMBER,
    financial_goal: DataTypes.NUMBER,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    deleted_by: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "t_project_detail",
    modelName: "PrjectDetail",
    timestamps: false,
  }
);

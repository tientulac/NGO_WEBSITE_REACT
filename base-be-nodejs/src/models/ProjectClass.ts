// src/models/role.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection";
import { BaseModel } from "./BaseClass";

export class ProjectClass extends BaseModel {}

ProjectClass.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    cate_id: DataTypes.NUMBER,
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    video_url: DataTypes.STRING,
    organization_id: DataTypes.NUMBER,
    status: DataTypes.STRING,
    field_type: DataTypes.STRING,
    deadline: DataTypes.DATE,
    public: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    deleted_by: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "t_project",
    modelName: "Project",
    timestamps: false,
  }
);

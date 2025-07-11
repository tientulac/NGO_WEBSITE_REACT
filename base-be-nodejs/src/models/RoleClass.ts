// src/models/role.model.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection";
import { BaseModel } from "./BaseClass";

export class RoleClass extends BaseModel {}

RoleClass.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
    deleted_by: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "t_role",
    modelName: "Role",
    timestamps: false,
  }
);

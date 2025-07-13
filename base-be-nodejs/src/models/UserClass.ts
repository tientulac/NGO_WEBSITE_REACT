// src/models/role.model.ts
import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection";
import { BaseModel } from "./BaseClass";

export class UserClass extends BaseModel {}

UserClass.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: DataTypes.STRING,
    role_code: DataTypes.STRING,
    full_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    bank_account: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    total_amount: DataTypes.NUMBER,
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

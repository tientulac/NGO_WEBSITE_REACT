// src/models/role.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection";
import { BaseModel } from "./BaseClass";

export class DonationHistoryClass extends BaseModel {}

DonationHistoryClass.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.NUMBER,
    project_detail_id: DataTypes.NUMBER,
    organization_id: DataTypes.NUMBER,
    amount: DataTypes.NUMBER,
    donate_method: DataTypes.STRING,
    transaction_code: DataTypes.STRING,
    note: DataTypes.STRING,
    donate_time: DataTypes.DATE,
    is_anonymous: DataTypes.BOOLEAN,
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
    tableName: "t_donation_history",
    modelName: "DonationHistory",
    timestamps: false,
  }
);

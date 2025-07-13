// src/models/role.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection";
import { BaseModel } from "./BaseClass";

export class FeedbackReviewClass extends BaseModel {}

FeedbackReviewClass.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.NUMBER,
    project_id: DataTypes.NUMBER,
    organization_id: DataTypes.NUMBER,
    rating: DataTypes.NUMBER,
    content: DataTypes.STRING,
    is_public: DataTypes.BOOLEAN,
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
    tableName: "t_feedback_review",
    modelName: "FeedbackReview",
    timestamps: false,
  }
);

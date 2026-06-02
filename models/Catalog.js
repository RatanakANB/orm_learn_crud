/**
 * @openapi
 * components:
 *   schemas:
 *     Catalog:
 *       type: object
 *       properties:
 *         catalog_id:
 *           type: integer
 *         catalog_name:
 *           type: string
 *         create_at:
 *           type: string
 *           format: date-time
 *     CatalogCreate:
 *       type: object
 *       required:
 *         - catalog_name
 *       properties:
 *         catalog_name:
 *           type: string
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Catalog = sequelize.define(
  "Catalog",
  {
    catalog_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    catalog_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "catalog",
    timestamps: false,
  }
);

export default Catalog;
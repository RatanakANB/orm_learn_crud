/**
 * @openapi
 * components:
 *   schemas:
 *     Unit:
 *       type: object
 *       properties:
 *         unit_id:
 *           type: integer
 *         unit_name:
 *           type: string
 *         create_at:
 *           type: string
 *           format: date-time
 *     UnitCreate:
 *       type: object
 *       required:
 *         - unit_name
 *       properties:
 *         unit_name:
 *           type: string
 */
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Unit = sequelize.define(
    "Unit",{
        unit_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        unit_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        create_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },{
        tableName: "unit",
        timestamps:false
    }
)
export default Unit;
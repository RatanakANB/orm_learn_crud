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
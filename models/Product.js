import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define('Product',
    {
        product_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        catalog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        product_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },{
        tableName: 'products',
        timestamps: false,
    }
)

export default Product;
/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         product_id:
 *           type: integer
 *         catalog_id:
 *           type: integer
 *         product_name:
 *           type: string
 *         product_price:
 *           type: integer
 *         unit_id:
 *           type: integer
 *         product_quantity:
 *           type: integer
 *         create_at:
 *           type: string
 *           format: date-time
 *     ProductCreate:
 *       type: object
 *       required:
 *         - catalog_id
 *         - product_name
 *         - product_price
 *         - unit_id
 *         - product_quantity
 *       properties:
 *         catalog_id:
 *           type: integer
 *         product_name:
 *           type: string
 *         product_price:
 *           type: integer
 *         unit_id:
 *           type: integer
 *         product_quantity:
 *           type: integer
 */
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
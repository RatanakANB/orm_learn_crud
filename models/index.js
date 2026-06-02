import sequelize from "../config/database.js";
import Catalog from "./Catalog.js";
import Unit from "./Unit.js";
import Product from "./Product.js";

Catalog.hasMany(Product, {
    foreignKey: "catalog_id"
});
Product.belongsTo(Catalog,{
    foreignKey: "catalog_id"
});

Unit.hasMany(Product,{
    foreignKey: "unit_id"
})
Product.belongsTo(Unit,{
    foreignKey: "unit_id"
})

export {
    sequelize,
    Catalog,
    Unit,
    Product
};
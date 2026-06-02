import { Product, Catalog, Unit } from "../models/index.js";

// Get all products (with catalog and unit)
export async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll({
      include: [Catalog, Unit],
      order: [["product_id", "ASC"]],
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

// Get one product by id
export async function getProductById(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Catalog, Unit],
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// Create a product
export async function createProduct(req, res, next) {
  try {
    const { catalog_id, product_name, product_price, unit_id, product_quantity } = req.body;

    if (!catalog_id || !unit_id || !product_name || product_price == null || product_quantity == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // optional: verify foreign keys exist
    const catalog = await Catalog.findByPk(catalog_id);
    if (!catalog) return res.status(400).json({ message: "Invalid catalog_id" });

    const unit = await Unit.findByPk(unit_id);
    if (!unit) return res.status(400).json({ message: "Invalid unit_id" });

    const product = await Product.create({
      catalog_id,
      product_name,
      product_price,
      unit_id,
      product_quantity,
    });

    const created = await Product.findByPk(product.product_id, { include: [Catalog, Unit] });

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

// Update a product
export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updates = {};
    const fields = ["catalog_id", "product_name", "product_price", "unit_id", "product_quantity"];
    for (const f of fields) {
      if (f in req.body) updates[f] = req.body[f];
    }

    // If catalog_id or unit_id present, verify existence
    if (updates.catalog_id) {
      const catalog = await Catalog.findByPk(updates.catalog_id);
      if (!catalog) return res.status(400).json({ message: "Invalid catalog_id" });
    }
    if (updates.unit_id) {
      const unit = await Unit.findByPk(updates.unit_id);
      if (!unit) return res.status(400).json({ message: "Invalid unit_id" });
    }

    await product.update(updates);

    const updated = await Product.findByPk(product.product_id, { include: [Catalog, Unit] });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

// Delete a product
export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
}
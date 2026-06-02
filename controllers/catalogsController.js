import { Catalog } from "../models/index.js";

// Fetch all catalogs
export async function getCatalogs(req, res, next) {
    try {
        const catalogs = await Catalog.findAll({
            order: [["catalog_id","ASC"]],
        })
        res.status(200).json(catalogs);
    } catch (error) {
        next(error);
    }
}

// Fetch a catalog via id
export async function getCatalogById(req, res, next) {
    try {
        const catalog = await Catalog.findByPk(req.params.id)
        
        if (!catalog) {
            return res.status(404).json({message: "Catalog not found"})
        }

        res.status(200).json(catalog)
    } catch (error) {
        next(error)
    }
}

// Create a Catalog
export async function createCatalog(req, res, next) {
    try {
        const catalog = await Catalog.create({
            catalog_name: req.body.catalog_name,
        });
        res.status(201).json(catalog)
    } catch (error) {
        next(error);
    }
}

// Update name my id
export async function updateCatalog(req, res, next) {
    try {
        const catalog = await Catalog.findByPk(req.params.id)
    

    if (!catalog) {
        return res.status(404).json({message: "Catalog not found"})
        }
    await catalog.update({
        catalog_name: req.body.catalog_name
    })
    res.status(200).json(catalog)
    } catch (error) {
        next(error)
    }
}

//  delete catalog by id
export async function deleteCatalog(req, res, next) {
    try {
        const catalog = await Catalog.findByPk(req.params.id)
    
    if (!catalog) {
        return res.status(404).json({message: "Catalog not found"})
        }
    await catalog.destroy();
    res.status(200).json({message: "Catalog delete successfully"})
    } catch (error) {
        next(error)
    }

}
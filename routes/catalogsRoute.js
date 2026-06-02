import express from "express";
import {
    getCatalogs,
    getCatalogById,
    createCatalog,
    updateCatalog,
    deleteCatalog,
} from "../controllers/catalogsController.js";

const router = express.Router();

router.get("/", getCatalogs);
router.get("/:id", getCatalogById);
router.post("/", createCatalog);
router.put("/:id", updateCatalog);
router.delete("/:id", deleteCatalog);

export default router;
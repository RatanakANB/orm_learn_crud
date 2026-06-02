import express from 'express'
import { createCatalog, getCatalogs, getCatalogById, updateCatalog, deleteCatalog } from '../controllers/catalogsController.js'

/**
 * @openapi
 * /catalogs:
 *   get:
 *     tags:
 *       - Catalogs
 *     summary: Get all catalogs
 *     responses:
 *       '200':
 *         description: OK
 *   post:
 *     tags:
 *       - Catalogs
 *     summary: Create a catalog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CatalogCreate'
 *     responses:
 *       '201':
 *         description: Created
 *
 * /catalogs/{id}:
 *   get:
 *     tags:
 *       - Catalogs
 *     summary: Get a catalog by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Not Found
 *   put:
 *     tags:
 *       - Catalogs
 *     summary: Update a catalog
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CatalogCreate'
 *     responses:
 *       '200':
 *         description: Updated
 *       '404':
 *         description: Not Found
 *   delete:
 *     tags:
 *       - Catalogs
 *     summary: Delete a catalog
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Deleted
 */

const router = express.Router()

router.get("/",getCatalogs)
router.get("/:id",getCatalogById)
router.post("/",createCatalog)
router.put("/:id",updateCatalog)
router.delete("/:id",deleteCatalog)

export default router

import express from "express";
import {
    getUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit,
} from "../controllers/unitController.js";

/**
 * @openapi
 * /units:
 *   get:
 *     tags:
 *       - Units
 *     summary: Get all units
 *     responses:
 *       '200':
 *         description: OK
 *   post:
 *     tags:
 *       - Units
 *     summary: Create a unit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnitCreate'
 *     responses:
 *       '201':
 *         description: Created
 *
 * /units/{id}:
 *   get:
 *     tags:
 *       - Units
 *     summary: Get a unit by id
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
 *       - Units
 *     summary: Update a unit
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
 *             $ref: '#/components/schemas/UnitCreate'
 *     responses:
 *       '200':
 *         description: Updated
 *       '404':
 *         description: Not Found
 *   delete:
 *     tags:
 *       - Units
 *     summary: Delete a unit
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

const router = express.Router();

router.get("/", getUnits);
router.get("/:id", getUnitById);
router.post("/", createUnit);
router.put("/:id", updateUnit);
router.delete("/:id", deleteUnit);

export default router;
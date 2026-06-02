import { Unit } from "../models/index.js";

export async function getUnits(req, res, next) {
    try {
        const units = await Unit.findAll({
            order: [["unit_id", "ASC"]],
        });

        res.status(200).json(units);
    } catch (error) {
        next(error);
    }
}

export async function getUnitById(req, res, next) {
    try {
        const unit = await Unit.findByPk(req.params.id);

        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        res.status(200).json(unit);
    } catch (error) {
        next(error);
    }
}

export async function createUnit(req, res, next) {
    try {
        const unit = await Unit.create({
            unit_name: req.body.unit_name,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
}

export async function updateUnit(req, res, next) {
    try {
        const unit = await Unit.findByPk(req.params.id);

        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        await unit.update({
            unit_name: req.body.unit_name,
        });

        res.status(200).json(unit);
    } catch (error) {
        next(error);
    }
}

export async function deleteUnit(req, res, next) {
    try {
        const unit = await Unit.findByPk(req.params.id);

        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        await unit.destroy();

        res.status(200).json({ message: "Unit deleted successfully" });
    } catch (error) {
        next(error);
    }
}
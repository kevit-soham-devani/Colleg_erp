"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const batch_model_1 = __importDefault(require("./batch.model"));
const student_model_1 = __importDefault(require("../students/student.model"));
const batch_helper_1 = require("./batch.helper");
const batch_DAL_1 = require("./batch.DAL");
class BatchController {
    async createBatch(req, res, next) {
        try {
            const { role } = req.user;
            if ((0, batch_helper_1.checkAdmin)(role)) {
                return res.status(401).send({ message: 'Not authorized' });
            }
            const { year, branches } = req.body;
            const existingBatch = await batch_model_1.default.findOne({ year });
            if (existingBatch) {
                return res.status(400).send({
                    message: 'Batch for this year already exists',
                });
            }
            const batch = await (0, batch_DAL_1.createNewBatch)({ year, branches });
            return res.status(201).send(batch);
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async addBranch(req, res, next) {
        try {
            const { role } = req.user;
            if ((0, batch_helper_1.checkAdmin)(role)) {
                return res.status(401).send({ message: 'Not authorized' });
            }
            const { year } = req.query;
            const batch = await (0, batch_DAL_1.addBranch)({ year, ...req.body });
            return res.status(200).send(batch);
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async deleteBatch(req, res, next) {
        try {
            const { role } = req.user;
            if ((0, batch_helper_1.checkAdmin)(role)) {
                return res.status(401).send({ message: 'Not authorized' });
            }
            const { year } = req.params;
            if (!year) {
                return res.status(404).send({
                    message: 'Year is required',
                });
            }
            const deletedBatch = await (0, batch_DAL_1.deleteBatchByYear)(year);
            if (!deletedBatch) {
                return res
                    .status(404)
                    .send({ message: 'Batch not found for the given year' });
            }
            await student_model_1.default.deleteMany({ batch: deletedBatch.year });
            return res
                .status(200)
                .send({ message: 'Batch deleted successfully' });
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async getBatches(req, res, next) {
        try {
            const { role } = req.user;
            if ((0, batch_helper_1.checkAdmin)(role)) {
                return res.status(401).send({ message: 'Not authorized' });
            }
            const batches = await batch_model_1.default.find();
            return res.status(200).send(batches);
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async updateBatch(req, res, next) {
        try {
            const { role } = req.user;
            if ((0, batch_helper_1.checkAdmin)(role)) {
                return res.status(401).send({ message: 'Not authorized' });
            }
            const { year } = req.query;
            if (!year) {
                return res.status(400).send({
                    message: 'Year is required',
                });
            }
            const batch = await (0, batch_DAL_1.updateBatch)({ year, ...req.body });
            return res.status(200).send(batch);
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async getVacantSeats(req, res, next) {
        try {
            const { role } = req.user;
            if ((0, batch_helper_1.checkAdmin)(role)) {
                return res.status(401).send({ message: 'Not authorized' });
            }
            const { year } = req.query;
            if (!year) {
                return res.status(400).send({ message: 'Year is required' });
            }
            const vacantSeats = await (0, batch_helper_1.getVacantSeatsByYear)(Number(year));
            return res.status(200).send(vacantSeats);
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
}
exports.default = BatchController;
//# sourceMappingURL=batch.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const batch_controller_1 = __importDefault(require("./batch.controller"));
const admin_middleware_1 = __importDefault(require("../../utils/admin.middleware"));
class BatchRoute {
    constructor() {
        this.batchController = new batch_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/batch', this.batchController.getBatches);
        this.router.post('/batch', this.batchController.createBatch);
        this.router.post('/batch/branch', this.batchController.addBranch);
        this.router.delete('/batch/:year', this.batchController.deleteBatch);
        this.router.patch('/:id', admin_middleware_1.default, this.batchController.updateBatch);
        this.router.get('/batch/analytics', this.batchController.getVacantSeats);
    }
}
exports.default = new BatchRoute().router;
//# sourceMappingURL=batch.routes.js.map
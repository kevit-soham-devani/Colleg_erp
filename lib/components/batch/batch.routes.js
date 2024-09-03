"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const batch_controller_1 = __importDefault(require("./batch.controller"));
const auth_1 = __importDefault(require("../../utils/auth"));
const batch_helper_1 = require("./batch.helper");
class BatchRoute {
    constructor() {
        this.batchController = new batch_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/batch', auth_1.default, batch_helper_1.checkAdmin, this.batchController.getBatches);
        this.router.post('/batch', auth_1.default, batch_helper_1.checkAdmin, this.batchController.createBatch);
        this.router.post('/batch/branch', auth_1.default, batch_helper_1.checkAdmin, this.batchController.addBranch);
        this.router.delete('/batch/:year', auth_1.default, batch_helper_1.checkAdmin, this.batchController.deleteBatch);
        this.router.patch('/batch', auth_1.default, batch_helper_1.checkAdmin, this.batchController.updateBatch);
        this.router.get('/batch/analytics', auth_1.default, batch_helper_1.checkAdmin, this.batchController.getVacantSeats);
    }
}
exports.default = new BatchRoute().router;
//# sourceMappingURL=batch.routes.js.map
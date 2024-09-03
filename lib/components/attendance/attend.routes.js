"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attend_controller_1 = __importDefault(require("./attend.controller"));
const auth_1 = __importDefault(require("../../utils/auth"));
class AttendanceRoute {
    constructor() {
        this.attendanceController = new attend_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/attendance', auth_1.default, this.attendanceController.createAttendance);
        this.router.get('/absentees', auth_1.default, this.attendanceController.getAttendance);
        this.router.patch('/attendance/:rollNumber', auth_1.default, this.attendanceController.updateAttendance);
        this.router.get('/attendance/analytics', auth_1.default, this.attendanceController.getAttendanceAnalytics);
    }
}
exports.default = new AttendanceRoute().router;
//# sourceMappingURL=attend.routes.js.map
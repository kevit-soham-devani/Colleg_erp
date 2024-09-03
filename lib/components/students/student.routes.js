"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = __importDefault(require("./student.controller"));
const auth_1 = __importDefault(require("../../utils/auth"));
class StudentRoute {
    constructor() {
        this.studentController = new student_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/student', auth_1.default, this.studentController.createStudent);
        this.router.get('/student', auth_1.default, this.studentController.getStudents);
        this.router.delete('/student/:rollNumber', auth_1.default, this.studentController.deleteStudent);
        this.router.get('/analytics/students', auth_1.default, this.studentController.getStudentAnalytics);
        this.router.patch('/student/:rollNumber', auth_1.default, this.studentController.updateStudent);
    }
}
exports.default = new StudentRoute().router;
//# sourceMappingURL=student.routes.js.map
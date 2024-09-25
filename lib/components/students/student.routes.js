"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = __importDefault(require("./student.controller"));
const student_validator_1 = require("./student.validator");
const handlevalidator_1 = require("../../utils/handlevalidator");
class StudentRoute {
    constructor() {
        this.studentController = new student_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/student', this.studentController.createStudent);
        this.router.get('/student', this.studentController.getStudents);
        this.router.delete('/student/:rollNumber', ...student_validator_1.deleteStudentByrollNumber, handlevalidator_1.handleValidationErrors, this.studentController.deleteStudent);
        this.router.get('/analytics/students', this.studentController.getStudentAnalytics);
        this.router.patch('/student/:rollNumber', ...student_validator_1.updateStudentValidator, handlevalidator_1.handleValidationErrors, this.studentController.updateStudent);
    }
}
exports.default = new StudentRoute().router;
//# sourceMappingURL=student.routes.js.map
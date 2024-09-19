"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentByrollNumber = exports.updateStudentValidator = void 0;
const express_validator_1 = require("express-validator");
const updateStudentValidator = [
    (0, express_validator_1.body)('name').isString().withMessage('Name is required'),
    (0, express_validator_1.body)('rollNumber').isNumeric().withMessage('Roll no is must be numeric'),
    (0, express_validator_1.body)('mobileNumber').isNumeric().withMessage('Mobile number must be numeric'),
    (0, express_validator_1.body)('batch').notEmpty().withMessage('Batch cannot be empty'),
    (0, express_validator_1.body)('semester').isInt({ min: 1 }).withMessage('semester must be a positive integer'),
];
exports.updateStudentValidator = updateStudentValidator;
const deleteStudentByrollNumber = [(0, express_validator_1.param)('rollNumber')];
exports.deleteStudentByrollNumber = deleteStudentByrollNumber;
//# sourceMappingURL=student.validator.js.map
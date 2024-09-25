"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = exports.signUpValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
const user_enum_1 = require("./user.enum");
const loginValidator = [
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('username is required!'),
    (0, express_validator_1.body)('password').isString().notEmpty().withMessage('password is required!'),
];
exports.loginValidator = loginValidator;
const signUpValidator = [
    (0, express_validator_1.body)('password').isString().isLength({ min: 7 }).withMessage('password must be of minimum 7 characters!'),
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('username is required!'),
    (0, express_validator_1.body)('role').isString().notEmpty().withMessage('Role is required').isIn([user_enum_1.User_Role.Admin, user_enum_1.User_Role.Staff]).withMessage('Role must be either "admin" or "staffmember"'),
];
exports.signUpValidator = signUpValidator;
const updateValidator = [
    (0, express_validator_1.body)('_id').isString().notEmpty().withMessage('Id is required'),
    (0, express_validator_1.body)('role').isString().notEmpty().withMessage('Role is required').isIn([user_enum_1.User_Role.Admin, user_enum_1.User_Role.Staff]).withMessage('Role must be either "admin" or "staffmember"'),
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('username is required'),
    (0, express_validator_1.body)('phoneNumber').notEmpty().withMessage('Phone number must be correct')
];
exports.updateValidator = updateValidator;
//# sourceMappingURL=user.validator.js.map
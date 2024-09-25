"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_1 = __importDefault(require("../../utils/auth"));
const verifyrole_1 = __importDefault(require("../../utils/verifyrole"));
const user_validator_1 = require("./user.validator");
const handlevalidator_1 = require("../../utils/handlevalidator");
class UserRouter {
    constructor() {
        this.userController = new user_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/user/signup', auth_1.default, verifyrole_1.default, ...user_validator_1.signUpValidator, handlevalidator_1.handleValidationErrors, this.userController.createUser);
        this.router.post('/users/login', ...user_validator_1.loginValidator, handlevalidator_1.handleValidationErrors, this.userController.logInUser);
        this.router.patch('/user/:_id', auth_1.default, ...user_validator_1.updateValidator, handlevalidator_1.handleValidationErrors, this.userController.updateUser);
        this.router.delete('/users/:_id', auth_1.default, this.userController.deleteUser);
        this.router.get('/user', verifyrole_1.default, auth_1.default, this.userController.getUsers);
        this.router.delete('/user/logout', auth_1.default, this.userController.logOutUser);
    }
}
exports.default = new UserRouter().router;
//# sourceMappingURL=user.routes.js.map
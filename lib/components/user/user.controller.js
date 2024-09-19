"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_DAL_1 = require("./user.DAL");
const user_enum_1 = require("./user.enum");
const user_model_1 = require("../user/user.model");
const auth_1 = require("../../utils/auth");
class userController {
    async createUser(req, res) {
        try {
            const { phoneNumber } = req.body;
            const existingUser = await user_model_1.User.findOne({ phoneNumber });
            if (existingUser) {
                return res.send({ message: 'User already exist' });
            }
            const user = await (0, user_DAL_1.createNewUser)(req.body);
            const token = (0, auth_1.generateToken)(user?._id?.toString());
            await user.addToken(token);
            res.status(200).send({ data: user, token });
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async logInUser(req, res, next) {
        try {
            const { PhoneNumber, password } = req.body;
            const user = await user_model_1.User.findOne({ PhoneNumber });
            if (!user) {
                return res.status(401).send({ error: 'Invalid credentials' });
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).send({ error: 'Invalid credentials' });
            }
            const token = (0, auth_1.generateToken)(user?._id?.toString());
            await user.addToken(token);
            res.status(200).send({ data: user, token });
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async updateUser(req, res, next) {
        try {
            const { role } = req.user;
            const { _id } = req.params;
            if (role !== user_enum_1.User_Role.Admin) {
                return res.send({ message: 'Not authorized' });
            }
            const updatedUser = await (0, user_DAL_1.updateuserDetails)(_id, req.body);
            return res.send({ data: updatedUser });
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { role } = req.user;
            const { _id } = req.params;
            if (role === user_enum_1.User_Role.Staff) {
                return res.send({ message: 'Only admin can delete User' });
            }
            const deletedUser = await (0, user_DAL_1.deleteUser)({ _id });
            if (!deletedUser) {
                return res.send({ message: 'User does not exists' });
            }
            res.send(deletedUser);
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async getUsers(req, res, next) {
        try {
            const { role } = req.user;
            if (role === user_enum_1.User_Role.Staff) {
                return res.send({ message: 'Not authorized' });
            }
            const users = await user_model_1.User.find();
            res.status(200).send({ data: users });
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async logOutUser(req, res, next) {
        try {
            req.user.tokens = [];
            await req.user.save();
            return res.send({ data: 'Succesfully logged out' });
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
}
exports.default = userController;
//# sourceMappingURL=user.controller.js.map
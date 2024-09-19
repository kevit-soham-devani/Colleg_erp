"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = createNewUser;
exports.GetUserByDetail = GetUserByDetail;
exports.deleteUser = deleteUser;
exports.findUserById = findUserById;
exports.findUser = findUser;
exports.updateuserDetails = updateuserDetails;
const user_model_1 = require("./user.model");
async function createNewUser(userBody = typeof user_model_1.User.schema.obj) {
    try {
        return await user_model_1.User.create(userBody);
    }
    catch (err) {
        return err;
    }
}
async function GetUserByDetail(userObj) {
    try {
        const user = await user_model_1.User.find({ ...userObj });
        return user;
    }
    catch (e) {
        return e;
    }
}
async function deleteUser(_id) {
    try {
        const deleteUser = await user_model_1.User.findByIdAndDelete(_id);
        return deleteUser;
    }
    catch (err) {
        return err;
    }
}
async function findUserById(id) {
    try {
        return await user_model_1.User.findOne({ id });
    }
    catch (err) {
        return err;
    }
}
async function findUser() {
    try {
        return await user_model_1.User.find().lean();
    }
    catch (err) {
        return err;
    }
}
async function updateuserDetails(phoneNumber, updateDetails) {
    try {
        const updateUser = await user_model_1.User.findOneAndUpdate({ PhoneNumber: phoneNumber }, { $set: updateDetails }, { new: true, runValidators: true });
        return updateUser;
    }
    catch (e) {
        return e;
    }
}
//# sourceMappingURL=user.DAL.js.map
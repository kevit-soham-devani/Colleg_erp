"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewStudent = createNewStudent;
exports.getStudentBydetail = getStudentBydetail;
exports.deleteStudent = deleteStudent;
exports.updateStudent = updateStudent;
const student_model_1 = __importDefault(require("./student.model"));
async function createNewStudent(reqBody) {
    try {
        return await student_model_1.default.create(reqBody);
    }
    catch (e) {
        return e;
    }
}
async function getStudentBydetail(obj) {
    try {
        return await student_model_1.default.find({ ...obj });
    }
    catch (e) {
        return e;
    }
}
async function deleteStudent(studentRollNumber) {
    try {
        const deletedStudent = await student_model_1.default.findOneAndDelete({
            rollNumber: studentRollNumber
        });
        return deletedStudent;
    }
    catch (e) {
        return e;
    }
}
async function updateStudent(rollNumber, updateData) {
    try {
        return await student_model_1.default.findOneAndUpdate({ rollNumber }, { $set: updateData }, { new: true, runValidators: true });
    }
    catch (e) {
        return e;
    }
}
//# sourceMappingURL=student.DAL.js.map
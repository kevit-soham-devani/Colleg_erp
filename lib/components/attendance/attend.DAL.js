"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAttendance = addAttendance;
exports.updateAttendanceRecord = updateAttendanceRecord;
const attend_model_1 = __importDefault(require("./attend.model"));
const moment_1 = __importDefault(require("moment"));
async function addAttendance(reqBody) {
    try {
        return await attend_model_1.default.create(reqBody);
    }
    catch (e) {
        return e;
    }
}
async function updateAttendanceRecord(rollNumber, date, isAbsent) {
    try {
        const formattedDate = (0, moment_1.default)(date, 'DD-MM-YYYY').toDate();
        return await attend_model_1.default.findOneAndUpdate({ rollNumber, date: formattedDate }, { isAbsent }, { new: true, runValidators: true });
    }
    catch (e) {
        throw new Error(`Error while updating attendance: ${e.message}`);
    }
}
//# sourceMappingURL=attend.DAL.js.map
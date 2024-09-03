"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const attendence_enum_1 = require("./attendence.enum");
const { Schema, model } = mongoose_1.default;
const attendanceSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: () => (0, moment_1.default)().toDate()
    },
    isAbsent: {
        type: String,
        enum: attendence_enum_1.ISABSENT,
        required: true,
    },
    rollNumber: {
        type: String,
        ref: 'User',
        required: true,
    },
});
const Attendance = model('Attendance', attendanceSchema);
exports.default = Attendance;
//# sourceMappingURL=attend.model.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_enum_1 = require("../../components/user/user.enum");
const { Schema, model } = mongoose_1.default;
const studentSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    rollNumber: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: Schema.Types.Number,
        required: true,
        unique: true
    },
    department: {
        enum: user_enum_1.Department,
        type: String,
        required: true,
    },
    batch: {
        type: Number,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ['student'],
        immutable: true,
    },
}, {
    timestamps: true
});
const Student = model('Student', studentSchema);
exports.default = Student;
//# sourceMappingURL=student.model.js.map
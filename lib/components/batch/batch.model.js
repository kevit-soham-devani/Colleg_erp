"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_enum_1 = require("../../components/user/user.enum");
const branchSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: user_enum_1.Department,
    },
    totalStudentsIntake: {
        type: Number,
        required: true,
    },
    currentSeatCount: {
        type: Number,
        required: true,
        default: 0,
    },
});
const batchSchema = new mongoose_1.Schema({
    year: {
        type: Number,
        required: true
    },
    branches: [branchSchema],
    totalEnrolledStudents: {
        type: Number,
        required: true,
        default: 0,
    },
});
batchSchema.pre('save', function (next) {
    const totalEnrolled = this.branches.reduce((total, branch) => {
        return total + branch.currentSeatCount;
    }, 0);
    this.totalEnrolledStudents = totalEnrolled;
    next();
});
const Batch = (0, mongoose_1.model)('Batches', batchSchema);
exports.default = Batch;
//# sourceMappingURL=batch.model.js.map
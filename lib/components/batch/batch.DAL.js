"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewBatch = createNewBatch;
exports.deleteBatchByYear = deleteBatchByYear;
exports.updateBatch = updateBatch;
exports.addBranch = addBranch;
const batch_model_1 = __importDefault(require("./batch.model"));
async function createNewBatch(reqBody) {
    try {
        return await batch_model_1.default.create(reqBody);
    }
    catch (e) {
        return e;
    }
}
async function deleteBatchByYear(year) {
    try {
        return await batch_model_1.default.findOneAndDelete({ year });
    }
    catch (e) {
        return e;
    }
}
async function updateBatch({ year, branchName, newBranchName, totalStudentsIntake, currentSeatCount, }) {
    try {
        if (!branchName) {
            return { mesage: 'BranchName is required' };
        }
        const batch = await batch_model_1.default.findOne({ year });
        if (!batch) {
            return { message: 'Batch not found for the given year' };
        }
        const branch = batch.branches.find((branch) => branch.name === branchName);
        if (!branch) {
            return { message: 'Branch not found in the batch' };
        }
        if (newBranchName) {
            branch.name = newBranchName;
        }
        if (totalStudentsIntake) {
            branch.totalStudentsIntake = totalStudentsIntake;
        }
        if (currentSeatCount) {
            branch.currentSeatCount = currentSeatCount;
        }
        await batch.save();
        return batch;
    }
    catch (e) {
        return e;
    }
}
async function addBranch({ year, name, totalStudentsIntake, currentSeatCount, }) {
    try {
        if (!year) {
            return {
                message: 'Year is required',
            };
        }
        const batch = await batch_model_1.default.findOne({ year });
        if (!batch) {
            return { message: 'Batch not found for the given year' };
        }
        const branchExists = batch.branches.some((branch) => branch.name === name);
        if (branchExists) {
            return { message: 'Branch already exists in the batch' };
        }
        batch.branches.push({
            name,
            totalStudentsIntake,
            currentSeatCount,
        });
        await batch.save();
        return batch;
    }
    catch (e) { }
}
//# sourceMappingURL=batch.DAL.js.map
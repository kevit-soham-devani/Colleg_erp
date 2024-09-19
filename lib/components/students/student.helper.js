"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSeat = checkSeat;
exports.getStudentAnalyticsData = getStudentAnalyticsData;
exports.incrementSeatCount = incrementSeatCount;
exports.decrementSeatCount = decrementSeatCount;
const batch_model_1 = __importDefault(require("../batch/batch.model"));
const student_model_1 = __importDefault(require("./student.model"));
async function checkSeat(department, batch, req, res) {
    try {
        const foundBatch = await batch_model_1.default.findOne({ year: batch });
        if (!foundBatch) {
            throw new Error('Batch not found for the given year');
        }
        const branch = foundBatch.branches.find((branch) => branch.name === department);
        if (!branch) {
            throw new Error('Branch not found in the batch');
        }
        return branch.totalStudentsIntake > branch.currentSeatCount;
    }
    catch (e) {
        return res.status(500).send({ message: e });
    }
}
async function getStudentAnalyticsData() {
    try {
        const analytics = await student_model_1.default.aggregate([
            {
                $group: {
                    _id: {
                        year: '$batch',
                        branch: '$department',
                    },
                    totalStudents: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: '$_id.year',
                    totalStudents: { $sum: '$totalStudents' },
                    branches: {
                        $push: {
                            k: '$_id.branch',
                            v: '$totalStudents',
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    year: '$_id',
                    totalStudents: 1,
                    branches: { $arrayToObject: '$branches' },
                },
            },
        ]);
        return analytics;
    }
    catch (e) {
        throw new Error(`Error while getting student analytics data: ${e.message}`);
    }
}
async function incrementSeatCount({ department, batch, res }) {
    try {
        return await batch_model_1.default.findOneAndUpdate({ year: batch, 'branches.name': department }, {
            $inc: {
                'branches.$.currentSeatCount': 1,
                totalEnrolledStudents: 1,
            },
        }, { new: true });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
}
async function decrementSeatCount(student, res) {
    try {
        return await batch_model_1.default.findOneAndUpdate({ year: student.batch, 'branches.name': student.department }, {
            $inc: {
                'branches.$.currentSeatCount': -1,
                totalEnrolledStudents: -1,
            },
        }, { new: true });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
}
//# sourceMappingURL=student.helper.js.map
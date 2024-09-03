"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVacantSeatsByYear = void 0;
exports.checkAdmin = checkAdmin;
const batch_model_1 = __importDefault(require("./batch.model"));
const user_enum_1 = require("../user/user.enum");
const getVacantSeatsByYear = async (year) => {
    const vacantSeats = await batch_model_1.default.aggregate([
        {
            $match: {
                year,
            },
        },
        {
            $project: {
                _id: 0,
                batch: '$year',
                totalStudents: '$totalEnrolledStudents',
                totalStudentsIntake: {
                    $sum: '$branches.totalStudentsIntake',
                },
                availableIntake: {
                    $subtract: [
                        {
                            $sum: '$branches.totalStudentsIntake',
                        },
                        {
                            $sum: '$branches.currentSeatCount',
                        },
                    ],
                },
                branches: {
                    $map: {
                        input: '$branches',
                        as: 'branch',
                        in: {
                            k: '$$branch.name',
                            v: {
                                totalStudents: '$$branch.currentSeatCount',
                                totalStudentsIntake: '$$branch.totalStudentsIntake',
                                availableIntake: {
                                    $subtract: [
                                        '$$branch.totalStudentsIntake',
                                        '$$branch.currentSeatCount',
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            $project: {
                batch: 1,
                totalStudents: 1,
                totalStudentsIntake: 1,
                availableIntake: 1,
                branch: {
                    $arrayToObject: '$branches',
                },
            },
        },
    ]);
    return vacantSeats;
};
exports.getVacantSeatsByYear = getVacantSeatsByYear;
function checkAdmin(role) {
    return role !== user_enum_1.User_Role.Admin;
}
//# sourceMappingURL=batch.helper.js.map
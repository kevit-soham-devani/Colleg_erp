"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLowAttendance = void 0;
const attend_model_1 = __importDefault(require("./attend.model"));
const moment_1 = __importDefault(require("moment"));
const attendence_enum_1 = require("./attendence.enum");
const config_1 = require("../../config");
const getLowAttendance = async (queryParams) => {
    const { startDate, endDate } = queryParams;
    const formattedStartDate = (0, moment_1.default)(startDate, config_1.DATE_FORMAT)
        .startOf('day')
        .toDate();
    const formattedEndDate = (0, moment_1.default)(endDate, config_1.DATE_FORMAT)
        .endOf('day')
        .toDate();
    const query = {
        date: { $gte: formattedStartDate, $lte: formattedEndDate },
    };
    return await attend_model_1.default.aggregate([
        { $match: query },
        {
            $group: {
                _id: '$rollNumber',
                totalDays: { $sum: 1 },
                absentDays: {
                    $sum: {
                        $cond: [{ $eq: ['$isAbsent', attendence_enum_1.ISABSENT.ABSENT] }, 1, 0],
                    },
                },
            },
        },
        {
            $addFields: {
                attendancePercentage: {
                    $subtract: [
                        100,
                        {
                            $divide: [
                                {
                                    $multiply: [100, '$absentDays'],
                                },
                                '$totalDays',
                            ],
                        },
                    ],
                },
            },
        },
        {
            $match: {
                attendancePercentage: { $lt: 75 },
            },
        },
        {
            $lookup: {
                from: 'students',
                localField: '_id',
                foreignField: 'rollNumber',
                as: 'studentDetails',
            },
        },
        {
            $unwind: '$studentDetails',
        },
        {
            $project: {
                _id: 0,
                attendancePercentage: 1,
                studentDetails: 1,
            },
        },
    ]);
};
exports.getLowAttendance = getLowAttendance;
//# sourceMappingURL=attend.helper.js.map
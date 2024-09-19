"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attend_model_1 = __importDefault(require("./attend.model"));
const attend_helper_1 = require("./attend.helper");
const attend_DAL_1 = require("./attend.DAL");
const student_model_1 = __importDefault(require("../students/student.model"));
const moment_1 = __importDefault(require("moment"));
const attendence_enum_1 = require("./attendence.enum");
const config_1 = require("../../config");
class AttendanceController {
    async createAttendance(req, res, next) {
        try {
            const { rollNumber, date } = req.body;
            const student = await student_model_1.default.findOne({ rollNumber });
            if (!student) {
                return res.send({ message: 'Student does not exists' });
            }
            const formattedDate = (0, moment_1.default)(date, config_1.DATE_FORMAT).toDate();
            const existingAttendance = await attend_model_1.default.findOne({
                rollNumber,
                date: formattedDate,
            });
            if (existingAttendance) {
                return res.send({
                    message: 'Attendance already recorded for this date',
                });
            }
            const attendance = await (0, attend_DAL_1.addAttendance)({
                ...req.body,
                date: formattedDate,
            });
            res.status(201).send(attendance);
        }
        catch (error) {
            return res.status(500).send({ message: error });
        }
    }
    async getAttendance(req, res, next) {
        try {
            const { date } = req.query;
            const formattedDate = (0, moment_1.default)(date, config_1.DATE_FORMAT).toDate();
            const attendanceRecords = await attend_model_1.default.find({
                date: formattedDate,
                isAbsent: attendence_enum_1.ISABSENT.ABSENT,
            }).select('rollNumber');
            if (!attendanceRecords.length) {
                return res.send({
                    message: 'No absent students found for this date',
                });
            }
            const rollNumbers = attendanceRecords.map((record) => record.rollNumber);
            const students = await student_model_1.default.find({
                rollNumber: { $in: rollNumbers },
            });
            res.status(200).send(students);
        }
        catch (e) {
            res.status(500).send(e);
        }
    }
    async updateAttendance(req, res, next) {
        try {
            const { rollNumber } = req.params;
            const { date, isAbsent } = req.body;
            if (!date || !isAbsent) {
                return res.status(400).send({
                    message: 'Please provide both date and isAbsent',
                });
            }
            const updatedAttendance = await (0, attend_DAL_1.updateAttendanceRecord)(rollNumber, date, isAbsent);
            if (!updatedAttendance) {
                return res.status(404).send({
                    message: 'Attendance record not found for this student on the specified date',
                });
            }
            res.status(200).send(updatedAttendance);
        }
        catch (e) {
            res.status(500).send({ message: e.message });
        }
    }
    async getAttendanceAnalytics(req, res, next) {
        try {
            const attendanceData = await (0, attend_helper_1.getLowAttendance)(req.query);
            return res.status(200).send({ data: attendanceData });
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }
}
exports.default = AttendanceController;
//# sourceMappingURL=attend.controller.js.map
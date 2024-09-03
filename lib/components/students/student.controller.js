"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const student_helper_1 = require("./student.helper");
const student_DAL_1 = require("./student.DAL");
class StudentController {
    async createStudent(req, res, next) {
        try {
            const { department, batch } = req.body;
            const isSeatAvailable = await (0, student_helper_1.checkSeat)(department, batch);
            if (!isSeatAvailable) {
                return res.send({
                    message: 'No seats available in the selected branch for this batch year',
                });
            }
            const student = await (0, student_DAL_1.createNewStudent)(req.body);
            await (0, student_helper_1.incrementSeatCount)({ department, batch });
            res.status(201).send(student);
        }
        catch (e) {
            res.send({ message: e.message });
        }
    }
    async getStudents(req, res, next) {
        try {
            const students = await (0, student_DAL_1.getStudentBydetail)({});
            if (!students) {
                return res.send({ message: 'No students exists' });
            }
            res.status(200).send(students);
        }
        catch (e) {
            res.send(e);
        }
    }
    async deleteStudent(req, res, next) {
        try {
            const { rollNumber } = req.params;
            const student = await (0, student_DAL_1.deleteStudent)(rollNumber);
            if (!student) {
                return res
                    .status(404)
                    .send({ message: 'Student does not exist' });
            }
            await (0, student_helper_1.decrementSeatCount)(student);
            return res.status(200).send(student);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }
    async getStudentAnalytics(req, res, next) {
        try {
            const analytics = await (0, student_helper_1.getStudentAnalyticsData)();
            res.status(200).send(analytics);
        }
        catch (e) {
            res.status(500).send({ message: e.message });
        }
    }
    async updateStudent(req, res, next) {
        try {
            const { rollNumber } = req.params;
            const updateData = req.body;
            const updatedStudent = await (0, student_DAL_1.updateStudent)(rollNumber, updateData);
            if (!updatedStudent) {
                return res.status(404).send({ message: 'Student not found' });
            }
            res.status(200).send(updatedStudent);
        }
        catch (e) {
            res.status(500).send({ message: e.message });
        }
    }
}
exports.default = StudentController;
//# sourceMappingURL=student.controller.js.map
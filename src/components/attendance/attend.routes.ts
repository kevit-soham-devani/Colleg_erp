/**attendance.routes.ts */
import { Router } from 'express';
import AttendanceController from './attend.controller';
import auth from '../../utils/auth'
import { createAttendanceValidator, updateAttendanceValidator } from './attend.validator';
import { handleValidationErrors } from 'utils/handlevalidator';
class AttendanceRoute {
	public router: Router;

	attendanceController = new AttendanceController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		//route to add attendance
		this.router.post(
			'/attendance',
			...createAttendanceValidator,
			handleValidationErrors,
			this.attendanceController.createAttendance,
		);
		//route to get absentees
		this.router.get(
			'/absentees',
			this.attendanceController.getAttendance,
		);
		//route to update attendance
		this.router.patch(
			'/attendance/:rollNumber',
			...updateAttendanceValidator,
			handleValidationErrors,
			this.attendanceController.updateAttendance,
		);
		//route to get attendance analytics(<75%)
		this.router.get(
			'/attendance/analytics',
			this.attendanceController.getAttendanceAnalytics,
		);
	}
}

export default new AttendanceRoute().router;

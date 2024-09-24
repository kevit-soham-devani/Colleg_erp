/**student.routes.ts */
import { Router } from 'express';
import StudentController from './student.controller';
import auth from '../../utils/auth';
import { deleteStudentByrollNumber, updateStudentValidator } from './student.validator';
import { handleValidationErrors } from '../../utils/handlevalidator';
class StudentRoute {
	public router: Router;

	studentController = new StudentController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post(
			'/student',
			this.studentController.createStudent,
		);
		this.router.get('/student', this.studentController.getStudents);
		this.router.delete(
			'/student/:rollNumber',
			...deleteStudentByrollNumber,
			handleValidationErrors,
			this.studentController.deleteStudent,
		);
		this.router.get(
			'/analytics/students',
			this.studentController.getStudentAnalytics,
		);
		this.router.patch(
			'/student/:rollNumber',
			...updateStudentValidator,
			handleValidationErrors,
			this.studentController.updateStudent,
		);
	}
}

export default new StudentRoute().router;

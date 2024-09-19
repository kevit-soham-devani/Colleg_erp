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
			handleValidationErrors,
			this.studentController.createStudent,
		);
		this.router.get('/student', auth, this.studentController.getStudents);
		this.router.delete(
			'/student/:rollNumber',
			handleValidationErrors,
			...deleteStudentByrollNumber,
			this.studentController.deleteStudent,
		);
		this.router.get(
			'/analytics/students',
			handleValidationErrors,
			this.studentController.getStudentAnalytics,
		);
		this.router.patch(
			'/student/:rollNumber',
			handleValidationErrors,
			...updateStudentValidator,
			this.studentController.updateStudent,
		);
	}
}

export default new StudentRoute().router;

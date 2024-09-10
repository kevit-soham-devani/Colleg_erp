/**student.routes.ts */
import { Router } from 'express';
import StudentController from './student.controller';
import auth from '../../utils/auth';
import { deleteStudentByrollNumber, updateStudentValidator } from './student.validator';
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
			auth,
			this.studentController.createStudent,
		);
		this.router.get('/student', auth, this.studentController.getStudents);
		this.router.delete(
			'/student/:rollNumber',
			auth,
			...deleteStudentByrollNumber,
			this.studentController.deleteStudent,
		);
		this.router.get(
			'/analytics/students',
			auth,
			this.studentController.getStudentAnalytics,
		);
		this.router.patch(
			'/student/:rollNumber',
			auth,
			...updateStudentValidator,
			this.studentController.updateStudent,
		);
	}
}

export default new StudentRoute().router;

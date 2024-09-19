/**application.routes.ts */
import { Application } from 'express';
import IndexRoute from './index';
import UserRoute from './components/user/user.routes';
import StudentRoute from './components/students/student.routes';
import AttendanceRoute from './components/attendance/attend.routes';
import BatchController from './components/batch/batch.routes';
import auth from './utils/auth';
export default class ApplicationConfig {
	static registerRoutes(app: Application) {
		app.use('/',auth, IndexRoute);
		app.use('/',auth,UserRoute);
		app.use('/',auth,StudentRoute);
		app.use('/',auth,AttendanceRoute);
		app.use('/',auth,BatchController);
	}
}

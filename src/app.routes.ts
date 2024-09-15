/**application.routes.ts */
import { Application } from 'express';
import IndexRoute from './index';
import UserRoute from './components/user/user.routes';
import StudentRoute from './components/students/student.routes';
import AttendanceRoute from './components/attendance/attend.routes';
import BatchController from './components/batch/batch.routes';
import auth from 'utils/auth';
export default class ApplicationConfig {
	static registerRoutes(app: Application) {
		app.use('/', IndexRoute,auth);
		app.use('/', UserRoute,auth);
		app.use('/', StudentRoute,auth);
		app.use('/', AttendanceRoute,auth);
		app.use('/', BatchController,auth);
	}
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const user_routes_1 = __importDefault(require("./components/user/user.routes"));
const student_routes_1 = __importDefault(require("./components/students/student.routes"));
const attend_routes_1 = __importDefault(require("./components/attendance/attend.routes"));
const batch_routes_1 = __importDefault(require("./components/batch/batch.routes"));
class ApplicationConfig {
    static registerRoutes(app) {
        app.use('/', index_1.default);
        app.use('/', user_routes_1.default);
        app.use('/', student_routes_1.default);
        app.use('/', attend_routes_1.default);
        app.use('/', batch_routes_1.default);
    }
}
exports.default = ApplicationConfig;
//# sourceMappingURL=app.routes.js.map
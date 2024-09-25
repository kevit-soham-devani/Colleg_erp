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
const auth_1 = __importDefault(require("./utils/auth"));
const admin_middleware_1 = __importDefault(require("utils/admin.middleware"));
class ApplicationConfig {
    static registerRoutes(app) {
        app.use('/', index_1.default);
        app.use('/', user_routes_1.default);
        app.use('/', auth_1.default, student_routes_1.default);
        app.use('/', auth_1.default, attend_routes_1.default);
        app.use('/', auth_1.default, admin_middleware_1.default, batch_routes_1.default);
    }
}
exports.default = ApplicationConfig;
//# sourceMappingURL=app.routes.js.map
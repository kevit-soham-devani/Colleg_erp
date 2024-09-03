"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.morganInstance = void 0;
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    transports: [new winston_1.transports.Console({ level: 'silly' })],
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.colorize(), winston_1.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)),
});
const morganformat = '[:date[iso]] :method :url :status :res[content-length] - :response-time ms';
exports.morganInstance = (0, morgan_1.default)(morganformat);
exports.log = logger;
//# sourceMappingURL=logger.js.map
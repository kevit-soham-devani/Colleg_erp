"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATE_FORMAT = void 0;
const Config = {
    server: {
        port: process.env.PORT || 3004,
    },
    mongodb: {
        url: process.env.MONGODB_URL ||
            "mongodb://127.0.0.1:27017/clg_database",
    },
};
exports.default = Config;
exports.DATE_FORMAT = 'DD-MM-YYYY';
//# sourceMappingURL=config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=config.js.map
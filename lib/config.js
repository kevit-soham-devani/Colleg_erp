"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATE_FORMAT = void 0;
const Config = {
    server: {
        port: process.env.PORT,
    },
    mongodb: {
        url: process.env.MONGODB_URL
    },
};
exports.default = Config;
exports.DATE_FORMAT = 'DD-MM-YYYY';
//# sourceMappingURL=config.js.map
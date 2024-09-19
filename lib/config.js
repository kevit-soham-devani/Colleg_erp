"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATE_FORMAT = void 0;
const Config = {
    server: {
        port: process.env.PORT
    },
    mongodb: {
        url: process.env.MONGOURL
    },
    jwtsecret: process.env.JWT_SECRET
};
exports.default = Config;
exports.DATE_FORMAT = 'DD-MM-YYYY';
//# sourceMappingURL=config.js.map
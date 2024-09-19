"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const logger_1 = require("../utils/logger");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(req.body);
    req.body = JSON.parse(req.body);
    if (!errors.isEmpty()) {
        logger_1.logger.error(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
//# sourceMappingURL=handlevalidator.js.map
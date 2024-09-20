"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = require("../components/user/user.model");
const config_1 = __importDefault(require("../config"));
const generateToken = (userId) => {
    const token = jwt.sign({ _id: userId }, config_1.default.jwtsecret);
    return token;
};
exports.generateToken = generateToken;
const auth = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.replace('Bearer ', '');
        if (!token) {
            return res
                .status(401)
                .send({ error: 'Please provide a token' });
        }
        const decoded = jwt.verify(token, config_1.default.jwtsecret);
        const user = await user_model_1.User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (e) {
        res.status(500).send({
            error: 'internal server',
        });
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map
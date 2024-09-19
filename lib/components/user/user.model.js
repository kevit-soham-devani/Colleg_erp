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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const { Schema, model } = mongoose_1.default;
const user_enum_1 = require("./user.enum");
const UserSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
    },
    PhoneNumber: {
        type: Schema.Types.Number,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    department: {
        type: String,
        enum: user_enum_1.Department,
        required: function () {
            return this.role === user_enum_1.User_Role.Staff;
        },
    },
    role: {
        type: String,
        enum: user_enum_1.User_Role,
        required: true,
    },
    semester: {
        type: Schema.Types.Number
    },
    tokens: [{ token: { type: String, required: true } }],
}, {
    timestamps: true,
});
UserSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
UserSchema.methods.addToken = async function (token) {
    this.tokens = this.tokens.concat({ token });
    await this.save();
};
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
exports.User = model("User", UserSchema);
//# sourceMappingURL=user.model.js.map
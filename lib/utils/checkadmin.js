"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_enum_1 = require("components/user/user.enum");
const checkAdmin = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== user_enum_1.User_Role.Admin) {
            return res.status(401).send({ message: 'Not authorized' });
        }
        next();
    }
    catch (e) {
        res.status(401).send({ message: 'Please authorize', e });
    }
};
exports.default = checkAdmin;
//# sourceMappingURL=checkadmin.js.map
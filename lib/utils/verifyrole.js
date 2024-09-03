"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../components/user/user.model");
const role = async (req, res, next) => {
    try {
        const { role: newUserRole } = req.body;
        if (!req.user) {
            const count = await user_model_1.User.countDocuments({ role: 'admin' });
            if (count) {
                return res.send({ message: 'Admin already exists' });
            }
            next();
        }
        else {
            const loggedInUserRole = req.user.role;
            if (loggedInUserRole === 'admin') {
                if (newUserRole !== 'staff' && newUserRole !== 'student') {
                    return res.send({
                        message: 'Admin can only create staff or students',
                    });
                }
            }
            else if (loggedInUserRole === 'staff') {
                if (newUserRole !== 'student') {
                    return res.send({
                        message: 'Staff can only create students ',
                    });
                }
            }
            else {
                return res.send({
                    message: 'Unauthorized to create this role',
                });
            }
            next();
        }
    }
    catch (e) {
        res.status(401).send({ error: 'Please authorize' });
    }
};
exports.default = role;
//# sourceMappingURL=verifyrole.js.map
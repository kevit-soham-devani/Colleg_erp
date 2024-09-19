import { User } from "../components/user/user.model";

const staffAuthorizationMiddleware = async (req, res, next) => {
	try {
			const loggedInUserRole = req.user.role;
			if (loggedInUserRole !== 'admin' || 'staff') {
				
					return res.send(401,{
						message: 'only admin or staff can do this operation',
					});
			} 
			next();
	} catch (e) {
		res.status(401).send({ error: 'Please authorize' });
	}
};

export default staffAuthorizationMiddleware;
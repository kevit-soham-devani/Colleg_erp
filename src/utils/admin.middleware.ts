import { User } from "../components/user/user.model";

const adminAuthorizationMiddleware = async (req, res, next) => {
	try {
			const loggedInUserRole = req.user.role;
			if (loggedInUserRole !== 'admin') {
				
					return res.send(401,{
						message: 'Only admin can do this operation',
					});
				
			} 
			next();
	} catch (e) {
		res.status(401).send({ error: 'Please authorize' });
	}
};

export default adminAuthorizationMiddleware;

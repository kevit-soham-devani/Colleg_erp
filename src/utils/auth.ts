import * as jwt from "jsonwebtoken";
import { User_Role } from "../components/user/user.enum";
import { User } from "../components/user/user.model";
import Config from "../config"

export const generateToken = (userId: string): string => {
    const token = jwt.sign({ _id: userId }, Config.jwtsecret);
    return token;
};


const auth = async (req, res, next) => {
	try {
		const { role } = req.body;
		
		if (role === User_Role.Admin) {
			next();
		} else {
			const token = req.headers['authorization']?.replace('Bearer ', '');
			if (!token) {
				return res
					.status(401)
					.send({ error: 'Please provide a token' });
			}
			const decoded = jwt.verify(token, Config.jwtsecret) as any;			
			const user = await User.findById(decoded._id);
			if (!user) {
				return res.status(404).json({error:'user not found'}) ;
			}
			req.token = token;
			req.user = user;
			next();
		}
	} catch (e) {
		res.status(500).send({
			error: 'internal server',
		});
	}
};

export default auth;




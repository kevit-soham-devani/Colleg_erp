import * as jwt from "jsonwebtoken";
import { User_Role } from "../components/user/user.enum";
import { User } from "../components/user/user.model";


// export const generateToken = (userId: string): string => {
// 	return jwt.sign({ _id: userId }, process.env.JWT_SECRET);
// };

export const generateToken = (userId: string): string => {
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET);
    console.log("Generated Token:", token);  // Debugging line
    return token;
};


const auth = async (req, res, next) => {
	try {
		console.log("--------");
		
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
			const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
			const user = await User.findById(decoded._id);
			if (!user) {
				return res.status(404).json({error:'user not found'}) ;
			}
			req.token = token;
			req.user = user;
			next();
		}
	} catch (e) {
		console.trace(e)
		res.status(500).send({
			error: 'internal server',
		});
	}
};

export default auth;




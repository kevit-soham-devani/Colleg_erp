/* eslint-disable @typescript-eslint/no-explicit-any */
import { createNewUser, deleteUser, findUser, updateuserDetails} from "./user.DAL";
import { User_Role } from "./user.enum";
import { User, UserInterface } from "../user/user.model";
import { generateToken } from "../../utils/auth";

class userController {
	/**
	 * Function to create a Staff or admin
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof UserController
	 */
	
  async createUser(req, res) {
    try {
    //   const {phoneNumber} = req.body
    //   const existingUser = await User.findOne(phoneNumber)
    //   if(existingUser) {
    //     return res.send({message: 'User already exist'})
    //   }
      const user = await createNewUser(req.body);
      const token = generateToken(user?._id?.toString())
      await user.addToken(token)
      res.status(200).send({ data: user, token})
    } catch (error) {
      return res.status(500).send({message : error});
    }
  }

  	/**
	 * Function to login User
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof UserController
	 */

  async logInUser(req,res, next) {
    try{
      const {PhoneNumber, password} = req.body;
      const user = await User.findOne({PhoneNumber})
      if (!user) {
				return res.status(401).send({ error: 'Invalid credentials' });
			}
      const isPasswordValid = await user.comparePassword(password);
			if (!isPasswordValid) {
				return res.status(401).send({ error: 'Invalid credentials' });
			}
			const token = generateToken(user?._id?.toString());
			await user.addToken(token);
			res.status(200).send({ data: user, token });
    } catch (error) {
		return res.status(500).send({message : error});
    }
  }

  async updateUser(req, res, next) {
	try {
		const { role } = req.user;
		const { _id } = req.params;
		if (role !== User_Role.Admin) {
			return res.send({ message: 'Not authorized' });
		}
		const updatedUser = await updateuserDetails(_id, req.body);
		return res.send({ data: updatedUser });
	} catch (error) {
		return res.status(500).send({message : error});
	}
}

	/**
	 * Function to delete user
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof UserController
	 */

	async deleteUser(req, res, next) {
		try {
			const { role } = req.user;
			const {_id} = req.params
			if (role === User_Role.Staff) {
				return res.send({ message: 'Only admin can delete User' });
			}
			const deletedUser = await deleteUser({ _id });
			if (!deletedUser) {
				return res.send({ message: 'User does not exists' });
			}
			res.send(deletedUser);
		} catch (error) {
			return res.status(500).send({message : error});	
		}
	}

	/**
	 * Function to get User
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof UserController
	 */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getUsers(req, res, next) {
		try {
			const { role } = req.user;
			if (role === User_Role.Staff) {
				return res.send({ message: 'Not authorized' });
			}
			const users = await User.find()
			res.status(200).send({ data: users });
		} catch (error) {
			return res.status(500).send({message : error});
		}
	}

		/**
	 * Function to logOut User
	 * @param {Request} req=>Express Request
	 * @param {Response} res=> Express Response
	 * @return {*}
	 * @memberof UserController
	 */
	
  async logOutUser(req, res, next) {
		try {
			req.user.tokens = [];
			await req.user.save();
			return res.send({ data: 'Succesfully logged out' });
		} catch (error) {
			return res.status(500).send({message : error});
		}
	}
}

export default userController;

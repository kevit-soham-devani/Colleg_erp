import { Router } from "express";
import userController from "./user.controller";
import auth from "../../utils/auth";
import role from "../../utils/verifyrole";
import { loginValidator, signUpValidator, updateValidator } from "./user.validator";
import { handleValidationErrors } from "../../utils/handlevalidator";
class UserRouter {
    public router: Router;

    userController = new userController();

    constructor () {
        this.router = Router();
        this.initializeRoutes()
    }

    initializeRoutes () {

        //signup
        this.router.post('/user/signup',
        auth,
        role,
        ...signUpValidator,
        this.userController.createUser)

        //loginUser
        this.router.post('/users/login',
        ...loginValidator,
        this.userController.logInUser)

        //UpdateUser
        this.router.patch('/user/:_id',
        auth,
        ...updateValidator,
        handleValidationErrors,
        this.userController.updateUser)

        //deleteuser
        this.router.delete('/users/:_id',auth,this.userController.deleteUser)

        //getListUser
        this.router.get('/user',role,auth,this.userController.getUsers)

        //logOutUser
        this.router.delete('/user/logout',auth,this.userController.logOutUser)
    }
}

export default new UserRouter().router
import {body} from 'express-validator';
import { User } from './user.model';
import { User_Role } from './user.enum';

const loginValidator: any[] = [
  body('name').isString().notEmpty().withMessage('username is required!'),
  body('password').isString().notEmpty().withMessage('password is required!'),
];

const signUpValidator: any[] =[
    body('password').isString().isLength({ min: 7 }).withMessage('password must be of minimum 7 characters!'),
    body('name').isString().notEmpty().isEmail().withMessage('please enter a valid email format!'),
    body('role').isString().notEmpty().withMessage('Role is required').isIn([User_Role.Admin, User_Role.Staff]).withMessage('Role must be either "admin" or "staffmember"'),
]

export {loginValidator, signUpValidator};
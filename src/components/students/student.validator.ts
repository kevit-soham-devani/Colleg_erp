import { param, body, } from 'express-validator';

const updateStudentValidator: any[] = [
  body('name').isString().withMessage('Name is required'),
  body('rollNumber').isNumeric().withMessage('Roll no is must be numeric'),
  body('mobileNumber').isNumeric().withMessage('Mobile number must be numeric'),
  body('batch').notEmpty().withMessage('Batch cannot be empty'),
  body('semester').isInt({ min: 1 }).withMessage('semester must be a positive integer'),
];

const deleteStudentByrollNumber : any[] = [param('rollNumber')];

export { updateStudentValidator, deleteStudentByrollNumber};

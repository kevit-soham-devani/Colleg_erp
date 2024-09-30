import { body, param, query } from "express-validator";

const createBatchValidator: any[] = [
    body('year').isNumeric().withMessage('Valid year is required'),
    body('branches').isArray().withMessage('At least one branch is required'),
]

const updateBatchValidator: any[] = [
    query('year').isNumeric().withMessage('Valid year is required'),
    body('branches').isArray().withMessage('At least one branch is required')
]

const deleteBatchValidator: any[] = [
    param('year').isNumeric().withMessage('Valid year is required for deletion'),
]

const addBranchValidator: any[] = [
    query('year').isNumeric().withMessage('Valid year is required'),
    body('name').isString().notEmpty().withMessage('Branch name is required'),
    body('totalStudentsIntake').isNumeric().withMessage('Total students intake must be a positive number'),
  ];

export {
    createBatchValidator,
    updateBatchValidator,
    deleteBatchValidator,
    addBranchValidator
}
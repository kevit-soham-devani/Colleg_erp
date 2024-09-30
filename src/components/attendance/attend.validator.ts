import { body } from "express-validator";
import { ISABSENT } from "./attendence.enum";

const createAttendanceValidator: any[] = [
    body('rollnumber').notEmpty().withMessage('Roll number is required').isNumeric().withMessage('Roll number must be a number'),
    body('date').notEmpty().isDate().withMessage('Date is required'),
    body('isAbsent')
    .isIn([ISABSENT.ABSENT, ISABSENT.PRESENT])
    .withMessage('isAbsent must be either 1 (ABSENT) or 0 (PRESENT)'),
]

const updateAttendanceValidator: any[] = [
    body('rollnumber').notEmpty().withMessage('Roll number is required').isNumeric().withMessage('Roll number must be a number'),
    body('date').notEmpty().isDate().withMessage('Date is required'),
    body('isAbsent')
    .isIn([ISABSENT.ABSENT, ISABSENT.PRESENT])
    .withMessage('isAbsent must be either 1 (ABSENT) or 0 (PRESENT)'),
]

export {
    createAttendanceValidator,
    updateAttendanceValidator
}
import express from 'express'
import { StudentController } from './student.controller'
import { StudentValidation } from './student.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)
router.get('/', StudentController.getAllStudent)
router.delete('/', StudentController.deleteStudent)

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent,
)

export const StudentRoutes = router

import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.createDepartment,
)
router.get('/', AcademicDepartmentController.getAllDepartment)
router.get('/:id', AcademicDepartmentController.getSingleDepartment)
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.updateDepartment,
)

export const AcademicFacultyRoutes = router

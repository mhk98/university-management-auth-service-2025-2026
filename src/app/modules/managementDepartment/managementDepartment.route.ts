import express from 'express'
import { ManagementDepartmentValidation } from './managementDepartment.validation'
import validateRequest from '../../../middlewares/validateRequest'
import { ManagementDepartmentController } from './managementDepartment.controller'
const router = express.Router()

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
)

export const ManagementDepartmentRoutes = router

import express from 'express'
import { FacultyController } from './faculty.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { FacultyValidation } from './faculty.validation'
const router = express.Router()

router.get('/', FacultyController.getAllFaculty)
router.get('/:id', FacultyController.getSingleFaculty)
router.patch('/:id', FacultyController.updateFaculty)
router.delete('/:id', validateRequest(FacultyValidation.updateFacultyZodSchema), FacultyController.deleteFaculty)

export const FacultyRoutes = router

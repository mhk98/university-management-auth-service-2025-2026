import express from 'express'
import { FacultyController } from './faculty.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { FacultyValidation } from './faculty.validation'
import { auth } from '../../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()

router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT), FacultyController.getAllFaculty)
router.get('/:id', FacultyController.getSingleFaculty)
router.patch('/:id', FacultyController.updateFaculty)
router.delete('/:id', validateRequest(FacultyValidation.updateFacultyZodSchema), FacultyController.deleteFaculty)

export const FacultyRoutes = router

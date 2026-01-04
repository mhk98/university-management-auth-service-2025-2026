import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import { auth } from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router();

router.post('/create', validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema), AcademicFacultyController.createFaculty);
router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY), AcademicFacultyController.getAllFaculty);
router.get('/:id',  AcademicFacultyController.getSingleFaculty);
router.patch('/:id', validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema), AcademicFacultyController.updateFaculty);

export const AcademicFacultyRoutes = router;


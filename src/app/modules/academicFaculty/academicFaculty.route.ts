import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';


const router = express.Router();

router.post('/create', validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema), AcademicFacultyController.createFaculty);
router.get('/',  AcademicFacultyController.getAllFaculty);
router.get('/:id',  AcademicFacultyController.getSingleFaculty);
router.patch('/:id', validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema), AcademicFacultyController.updateFaculty);

export const AcademicFacultyRoutes = router;


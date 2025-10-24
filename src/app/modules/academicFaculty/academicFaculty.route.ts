import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicFaculty.controller';

const router = express.Router();

router.post('/create', validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema), AcademicSemesterController.createSemester);
router.get('/',  AcademicSemesterController.getAllSemester);
router.get('/:id',  AcademicSemesterController.getSingleSemester);
router.patch('/:id', validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema), AcademicSemesterController.updateSemester);

export const AcademicSemesterRoutes = router;


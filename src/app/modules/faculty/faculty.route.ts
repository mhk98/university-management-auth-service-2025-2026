import express from 'express';
import { FacultyController } from './faculty.controller';
const router = express.Router();

router.post('/create-faculty', FacultyController.createFaculty);

export const FacultyRoutes = router;
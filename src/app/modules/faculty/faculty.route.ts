import express from 'express'
import { FacultyController } from './faculty.controller'
const router = express.Router()

router.post('/create-faculty', FacultyController.createFaculty)
router.get('/', FacultyController.getAllFaculty)
router.get('/:id', FacultyController.getSingleFaculty)

export const FacultyRoutes = router

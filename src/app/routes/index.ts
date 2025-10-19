import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/academicSemester',
        route: AcademicSemesterRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router;


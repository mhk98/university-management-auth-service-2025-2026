import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.get('/', AdminController.getAllAdmin)
router.get('/:id', AdminController.getSingleAdmin)
router.put('/:id', AdminController.updateAdmin)
router.delete('/:id', validateRequest(AdminValidation.updateAdminZodSchema), AdminController.deleteAdmin)

export const AdminRoutes = router;
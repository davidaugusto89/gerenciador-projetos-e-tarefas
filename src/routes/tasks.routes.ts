import { Router } from 'express';

import { TasksController } from '../controllers/tasks.controller';
import { validateRequest } from '../middlewares/validate';
import {
  createTaskValidation,
  updateTaskValidation,
  deleteTaskValidation,
} from '../validations/task.validation';

const router = Router();

router.post(
  '/projects/:projectId/tasks',
  createTaskValidation,
  validateRequest,
  TasksController.create,
);

router.put('/tasks/:id', updateTaskValidation, validateRequest, TasksController.update);

router.delete('/tasks/:id', deleteTaskValidation, validateRequest, TasksController.remove);

export default router;

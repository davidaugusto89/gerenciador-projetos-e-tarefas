import { Router } from 'express';

import { TasksController } from '../controllers/tasks.controller';

const router = Router();

router.post('/projects/:projectId/tasks', TasksController.create);
router.put('/tasks/:id', TasksController.update);
router.delete('/tasks/:id', TasksController.remove);

export default router;

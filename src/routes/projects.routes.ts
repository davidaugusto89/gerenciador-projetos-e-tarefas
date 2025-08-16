import { Router } from 'express';

import { ProjectsController } from '../controllers/projects.controller';

const router = Router();

router.post('/projects', ProjectsController.create);
router.get('/projects', ProjectsController.list);
router.get('/projects/:id', ProjectsController.get);
router.put('/projects/:id', ProjectsController.update);
router.delete('/projects/:id', ProjectsController.remove);

// Extra: GitHub integration + cache
router.get('/projects/:id/github/:username', ProjectsController.githubAttach);

export default router;

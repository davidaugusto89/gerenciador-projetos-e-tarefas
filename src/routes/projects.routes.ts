import { Router } from 'express';

import { ProjectsController } from '../controllers/projects.controller';
import { validateRequest } from '../middlewares/validate';
import {
  createProjectValidation,
  updateProjectValidation,
  fetchGitHubReposValidation,
} from '../validations/project.validation';

const router = Router();

router.post('/projects', createProjectValidation, validateRequest, ProjectsController.create);
router.get('/projects', ProjectsController.list);
router.get('/projects/:id', ProjectsController.get);
router.put('/projects/:id', updateProjectValidation, validateRequest, ProjectsController.update);
router.delete('/projects/:id', ProjectsController.remove);

router.get(
  '/projects/:id/github/:username',
  fetchGitHubReposValidation,
  validateRequest,
  ProjectsController.githubAttach,
);

export default router;

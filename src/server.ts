import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import { sequelize } from './models';
import projectsRouter from './routes/projects.routes';
import tasksRouter from './routes/tasks.routes';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

// Healthcheck
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const status =
    typeof (err as { status?: unknown })?.status === 'number'
      ? (err as { status: number }).status
      : 500;
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  console.log('Database connected');
  app.listen(PORT, () => console.log(`API running on :${PORT}`));
}
start();

import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import { sequelize } from './models';
import projectsRouter from './routes/projects.routes';
import tasksRouter from './routes/tasks.routes';

export const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/', projectsRouter);
app.use('/', tasksRouter);

// Healthcheck - versão Mandalorian
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'This is the way.' });
});

// Error handler tipado (sem any)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const status =
    typeof (err as { status?: unknown })?.status === 'number'
      ? (err as { status: number }).status
      : 500;
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(status).json({ error: message });
});

// opcional: helper para os testes fazerem auth/sync se precisarem
export async function ensureDb() {
  await sequelize.authenticate();
  // se quiser sincronizar nos testes: await sequelize.sync({ force: true });
}

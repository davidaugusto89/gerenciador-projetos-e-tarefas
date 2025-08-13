import 'reflect-metadata';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import Fastify from 'fastify';

import swaggerPlugin from './plugins/swagger';

const app = Fastify({ logger: true });

async function bootstrap() {
  await app.register(cors);
  await app.register(helmet);
  await app.register(rateLimit, { max: 100, timeWindow: '1 minute' });

  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'supersecret',
  });

  await app.register(swaggerPlugin);

  app.get(
    '/health',
    {
      schema: {
        description: 'Healthcheck',
        tags: ['health'],
        response: {
          200: {
            type: 'object',
            properties: { status: { type: 'string' } },
          },
        },
      },
    },
    async () => ({ status: 'ok' }),
  );

  const port = Number(process.env.PORT || 3000);
  await app.listen({ port, host: '0.0.0.0' });
}

bootstrap().catch((err) => {
  app.log.error(err);
  process.exit(1);
});

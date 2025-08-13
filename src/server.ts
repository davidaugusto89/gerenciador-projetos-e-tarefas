import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import Redis from 'ioredis';

import sequelize from './models';
import './models/project';
import './models/task';

dotenv.config();

const app = express();

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(express.json());

// Conexão com Redis
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
});

redis.on('connect', () => {
  console.log('✅ Conectado ao Redis');
});

redis.on('error', (err) => {
  console.error('❌ Erro no Redis:', err);
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL conectado via Sequelize');
  } catch (err) {
    console.error('❌ Falha ao conectar no DB:', err);
    process.exit(1);
  }
})();

// Rota de teste de saúde
app.get('/health', async (_req, res) => {
  const cacheKey = 'health_check';
  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.json({ source: 'cache', data: JSON.parse(cached) });
  }

  const data = { status: 'ok', uptime: process.uptime() };

  // Cache expira em 10 segundos
  await redis.set(cacheKey, JSON.stringify(data), 'EX', 10);

  res.json({ source: 'server', data });
});

// Configuração de porta
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando em http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
});

export { app, redis };

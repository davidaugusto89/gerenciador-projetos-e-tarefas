import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fp from 'fastify-plugin';

export default fp(async (app) => {
  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Gerenciador de Projetos e Tarefas',
        description: 'API REST para gerenciar projetos e tarefas',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:3000', description: 'Local dev' }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          Project: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              ownerId: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              tasks: {
                type: 'array',
                items: { $ref: '#/components/schemas/Task' },
              },
              githubRepos: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    html_url: { type: 'string', format: 'uri' },
                  },
                  required: ['id', 'name', 'html_url'],
                },
              },
            },
            required: ['title', 'ownerId'],
          },
          Task: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              projectId: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              status: { type: 'string', enum: ['todo', 'doing', 'done'] },
            },
            required: ['projectId', 'title', 'status'],
          },
          AuthRegisterInput: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              password: { type: 'string', minLength: 6 },
            },
            required: ['name', 'email', 'password'],
          },
          AuthLoginInput: {
            type: 'object',
            properties: {
              email: { type: 'string', format: 'email' },
              password: { type: 'string' },
            },
            required: ['email', 'password'],
          },
        },
      },
    },
  });

  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    // exposeRoute é true por padrão no swagger-ui
  });
});

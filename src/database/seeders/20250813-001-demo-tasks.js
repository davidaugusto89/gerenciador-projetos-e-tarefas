'use strict';

module.exports = {
  async up(queryInterface) {
    const [projects] = await queryInterface.sequelize.query('SELECT id FROM projects ORDER BY id');
    const now = new Date();
    if (!projects.length) return;

    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Planejar escopo',
        description: 'Definir requisitos',
        status: 'doing',
        projectId: projects[0].id,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Criar endpoints',
        description: 'CRUD de projects',
        status: 'todo',
        projectId: projects[0].id,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Modelar DB',
        description: 'Tabelas tasks',
        status: 'todo',
        projectId: projects[1]?.id || projects[0].id,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};

'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('projects', [
      { title: 'Projeto Alpha', description: 'Primeiro projeto', createdAt: now, updatedAt: now },
      { title: 'Projeto Beta', description: 'Segundo projeto', createdAt: now, updatedAt: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('projects', null, {});
  },
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING(150), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
    await queryInterface.addIndex('projects', ['title'], { name: 'idx_projects_title' });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('projects', 'idx_projects_title');
    await queryInterface.dropTable('projects');
  },
};

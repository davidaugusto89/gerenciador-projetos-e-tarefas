'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING(150), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      status: {
        type: Sequelize.ENUM('todo', 'doing', 'done'),
        allowNull: false,
        defaultValue: 'todo',
      },
      projectId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'projects', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
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
    await queryInterface.addIndex('tasks', ['title'], { name: 'idx_tasks_title' });
    await queryInterface.addIndex('tasks', ['status'], { name: 'idx_tasks_status' });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('tasks', 'idx_tasks_title');
    await queryInterface.removeIndex('tasks', 'idx_tasks_status');
    await queryInterface.dropTable('tasks');
    await queryInterface.sequelize
      .query('DROP TYPE IF EXISTS "enum_tasks_status";')
      .catch(() => {});
  },
};

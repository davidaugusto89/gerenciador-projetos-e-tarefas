import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  ForeignKey,
} from 'sequelize';

import sequelize from './index';
import { Project } from './project';

export type TaskStatus = 'todo' | 'doing' | 'done';

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string | null;
  declare status: TaskStatus;
  declare projectId: ForeignKey<Project['id']> | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Task.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.ENUM('todo', 'doing', 'done'),
      allowNull: false,
      defaultValue: 'todo',
    },
    projectId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'tasks',
    modelName: 'Task',
  },
);

// Associações
Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

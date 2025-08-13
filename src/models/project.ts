import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  NonAttribute,
  Association,
  HasManyGetAssociationsMixin,
} from 'sequelize';

import sequelize from './index';
import { Task } from './task';

export class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Associações (helpers)
  declare getTasks: HasManyGetAssociationsMixin<Task>;
  declare tasks?: NonAttribute<Task[]>;

  static associations: {
    tasks: Association<Project, Task>;
  };
}

Project.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'projects',
    modelName: 'Project',
  },
);

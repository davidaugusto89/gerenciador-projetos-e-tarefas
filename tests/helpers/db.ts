import { sequelize } from '../../src/models';

/**
 * Trunca TODAS as tabelas registradas nos models do Sequelize.
 * - Desabilita FKs para evitar ordem específica.
 * - Reseta AUTO_INCREMENT.
 */
export async function truncateAll() {
  if (!sequelize) {
    throw new Error('Sequelize não inicializado (import de ../../src/models falhou).');
  }

  // Desabilita FK para truncar em qualquer ordem (MySQL/InnoDB)
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

  // Dica: se quiser escolher a ordem, você pode ordenar models por dependência aqui
  const models = Object.values(sequelize.models);

  for (const model of models) {
    // destroy({ truncate: true }) é mais portável que TRUNCATE via query interface
    await (model as any).destroy({ where: {}, truncate: true, force: true });
  }

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
}

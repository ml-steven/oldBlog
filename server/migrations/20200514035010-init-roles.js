'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('roles', {
      roleId: { type: INTEGER, primaryKey: true, autoIncrement: true, field: 'role_id' },
      roleType: { type: INTEGER, field: 'role_type' },
      roleName: { type: STRING(10), field: 'role_name' },
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('roles');
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('sorts', {
      sortId: { type: INTEGER, primaryKey: true, autoIncrement: true, field: 'sort_id' },
      sortName: { type: STRING(50), field: 'sort_name' },
      sort_alias: { type: STRING(15), field: 'sort_alias' },
      sortDescription: { type: TEXT, field: 'sort_description' },
      parentSortId: { type: INTEGER, field: 'parent_sort_id' },
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('sorts');
  },
};

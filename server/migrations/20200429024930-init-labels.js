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
    await queryInterface.createTable('labels', {
      labelId: { type: INTEGER, primaryKey: true, autoIncrement: true, field: 'label_id' },
      labelName: { type: STRING(20), field: 'label_name' },
      labelAlias: { type: STRING(15), field: 'label_alias' },
      labelDescription: { type: TEXT, field: 'label_description' },
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('labels');
  },
};

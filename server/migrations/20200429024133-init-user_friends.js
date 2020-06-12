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
    await queryInterface.createTable('user_friends', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
      userId: { type: INTEGER, field: 'user_id' },
      userFriendsId: { type: INTEGER, field: 'user_friends_id' },
      userNote: { type: STRING(20), field: 'user_note' },
      userStatus: { type: STRING(20), field: 'user_status' },
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('user_friends');
  },
};

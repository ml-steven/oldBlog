'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { DATE, INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      userId: { type: INTEGER, primaryKey: true, autoIncrement: true, field: 'user_id' },
      userType: { type: INTEGER, field: 'user_type', allowNull: false, defaultValue: 3 },
      userIp: { type: STRING(20), field: 'user_ip' },
      userName: { type: STRING(20), field: 'user_name' },
      userPassword: { type: STRING(15), field: 'user_password' },
      userEmail: { type: STRING(20), field: 'user_email' },
      userProfilePhoto: { type: STRING, field: 'user_profile_photo' },
      userRegistrationTime: { type: DATE, field: 'user_registration_time' },
      userBirthday: { type: DATE, field: 'user_birthday' },
      userAge: { type: INTEGER, field: 'user_age' },
      userTelephone: { type: INTEGER(11), field: 'user_telephone_number' },
      userNickname: { type: STRING(20), field: 'user_nickname' },
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('users');
  },
};

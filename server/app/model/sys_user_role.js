/* indent size: 2 */
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;

  const SysUserRole = app.model.define('sys_user_role', {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'role_id',
    },
  }, {
    tableName: 'sys_user_role',
    timestamps: false,
  });

  SysUserRole.associate = function() {

  };

  return SysUserRole;
};

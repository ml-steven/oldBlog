/* indent size: 2 */
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;

  const SysRoleMenu = app.model.define('sys_role_menu', {
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'role_id',
    },
    menuId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'menu_id',
    },
  }, {
    tableName: 'sys_role_menu',
    timestamps: false,
  });

  SysRoleMenu.associate = function() {

  };

  return SysRoleMenu;
};

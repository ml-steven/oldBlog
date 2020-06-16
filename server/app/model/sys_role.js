/* indent size: 2 */
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;

  const SysRole = app.model.define('sys_role', {
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'role_id',
    },
    roleName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'role_name',
    },
    roleKey: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'role_key',
    },
    roleSort: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      field: 'role_sort',
    },
    dataScore: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '10',
      field: 'data_score',
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    delFlag: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: '0',
      field: 'del_flag',
    },
    createBy: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: '',
      field: 'create_by',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    updateBy: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: '',
      field: 'update_by',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
    remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  }, {
    tableName: 'sys_role',
  });

  SysRole.associate = function() {
    SysRole.belongsToMany(app.model.SysMenu, {
      as: 'menus', foreignKey: 'role_id', otherKey: 'menu_id', through: app.model.SysRoleMenu });
  };

  return SysRole;
};

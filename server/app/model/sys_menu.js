/* indent size: 2 */
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;

  const SysMenu = app.model.define('sys_menu', {
    menuId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'menu_id',
    },
    menuName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'menu_name',
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0',
      field: 'parent_id',
    },
    orderNum: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0',
      field: 'order_num',
    },
    path: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: '',
    },
    component: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isFrame: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1',
      field: 'is_frame',
    },
    menuType: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: '',
      field: 'menu_type',
    },
    visible: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: '0',
    },
    perms: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '#',
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
      defaultValue: '',
    },
  }, {
    tableName: 'sys_menu',
  });

  SysMenu.associate = function() {
    SysMenu.belongsToMany(app.model.SysRole, {
      as: 'roles', foreignKey: 'menu_id', otherKey: 'role_id', through: app.model.SysRoleMenu });
  };

  return SysMenu;
};

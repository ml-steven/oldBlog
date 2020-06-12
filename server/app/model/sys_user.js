/* indent size: 2 */
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;

  const SysUser = app.model.define('sys_user', {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id',
    },
    loginName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'login_name',
    },
    userName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'user_name',
    },
    userType: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: '00',
      field: 'user_type',
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
    },
    phonenumber: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: '',
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: '0',
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
    },
    salt: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '',
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: '0',
    },
    delFlag: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: '0',
      field: 'del_flag',
    },
    loginIp: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      field: 'login_ip',
    },
    loginDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'login_date',
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
    tableName: 'sys_user',
  });

  SysUser.associate = function() {
    SysUser.belongsToMany(app.model.SysRole, {
      as: 'roles', foreignKey: 'user_id', otherKey: 'role_id', through: app.model.SysUserRole });
  };

  return SysUser;
};

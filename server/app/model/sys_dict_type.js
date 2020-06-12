/* indent size: 2 */
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;

  const SysDictType = app.model.define('sys_dict_type', {
    dictId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'dict_id',
    },
    dictName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      field: 'dict_name',
    },
    dictType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      unique: true,
      field: 'dict_type',
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: '0',
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
    tableName: 'sys_dict_type',
  });

  SysDictType.associate = function() {

  };

  return SysDictType;
};

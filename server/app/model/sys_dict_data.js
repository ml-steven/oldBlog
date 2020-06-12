/* indent size: 2 */
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;

  const SysDictData = app.model.define('sys_dict_data', {
    dictCode: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'dict_code',
    },
    dictSort: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0',
      field: 'dict_sort',
    },
    dictLabel: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      field: 'dict_label',
    },
    dictValue: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      field: 'dict_value',
    },
    dictType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      field: 'dict_type',
    },
    cssClass: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'css_class',
    },
    listClass: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'list_class',
    },
    isDefault: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N',
      field: 'is_default',
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
    tableName: 'sys_dict_data',
  });

  SysDictData.associate = function() {

  };

  return SysDictData;
};

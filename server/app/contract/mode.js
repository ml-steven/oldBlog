/* egg_folder/app/contract/format.js */
'use strict';
module.exports = {
  response: {
    success: { type: 'boolean', required: true },
    errorMessage: { type: 'string' },
  },
  // 用户接口数据模型
  user: {
    user_id: {
      type: 'integer',
      description: '用户ID',
      example: '1',
    },
    login_name: {
      type: 'string',
      description: '登录账号',
      example: 'admin',
    },
    user_name: {
      type: 'string',
      description: '用户昵称',
      example: '某某',
    },
    user_type: {
      type: 'integer',
      description: '用户昵称',
    },
    email: {
      type: 'string',
      description: '用户邮箱',
    },
    phonenumber: {
      type: 'string',
      description: '手机号码',
    },
    sex: {
      type: 'string',
      description: '用户性别（0男 1女 2未知）',
    },
    avatar: {
      type: 'string',
      description: '头像路径',
    },
    password: {
      type: 'string',
      description: '密码',
    },
    salt: {
      type: 'string',
      description: '盐加密',
    },
    status: {
      type: 'string',
      description: '帐号状态（0正常 1停用）',
    },
    del_flag: {
      type: 'string',
      description: '删除标志（0代表存在 2代表删除）',
    },
    login_ip: {
      type: 'string',
      description: '最后登陆IP',
    },
    login_date: {
      type: 'string',
      description: '最后登陆时间',
    },
    create_by: {
      type: 'string',
      description: '创建者',
    },
    create_time: {
      type: 'string',
      description: '创建时间',
    },
    update_by: {
      type: 'string',
      description: '更新者',
    },
    update_time: {
      type: 'string',
      description: '更新时间',
    },
    remark: {
      type: 'string',
      description: '备注',
    },
    roles: {
      type: 'role',
      description: '角色信息',
    },
  },
  // 角色接口数据模型
  role: {
    role_id: {
      type: 'string',
      description: '角色ID',
    },
    role_name: {
      type: 'string',
      description: '角色名称',
    },
    role_key: {
      type: 'string',
      description: '角色权限字符串',
    },
    role_sort: {
      type: 'integer',
      description: '显示顺序',
    },
    data_scope: {
      type: 'string',
      description: '数据范围（1：全部数据权限 2：自定数据权限）',
      example: '1',
      enum: [ '1', '2' ],
    },
    status: {
      type: 'string',
      description: '角色状态（0正常 1停用）',
      enum: [ '0', '1' ],
      example: '0',
    },
    del_flag: {
      type: 'string',
      description: '删除标志（0代表存在 2代表删除）',
      enum: [ '0', '2' ],
      example: '0',
    },
    create_by: {
      type: 'string',
      description: '创建者',
    },
    create_time: {
      type: 'string',
      description: '创建时间',
    },
    update_by: {
      type: 'string',
      description: '更新者',
    },
    update_time: {
      type: 'string',
      description: '更新时间',
    },
    remark: {
      type: 'string',
      description: '备注',
    },
  },
};

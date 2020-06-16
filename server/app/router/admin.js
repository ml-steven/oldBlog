'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checkIsAdmin = app.middleware.checkIsAdmin();
  // 后台登录接口 app.jwt
  router.get('/user/captchaImage', controller.login.verify);
  router.post('/user/login', controller.login.login);
  router.post('/user/logout', controller.login.logout);
  // 用户
  router.get('/user/getInfo', controller.users.getInfo);
  router.post('/user/register', controller.users.register);
  router.post('/user/valiteLoginName', controller.users.valiteLoginName);
  router.get('/user/modify', controller.users.modify);

  // 系统用户
  router.get('/system/user/list', controller.sysuser.list);
  router.put('/system/user/changeStatus', controller.sysuser.changeStatus);
  router.put('/system/user/resetPwd', controller.sysuser.resetPwd);
  router.get('/system/user/:id?', controller.sysuser.show);
  router.put('/system/user', controller.sysuser.modify);
  router.post('/system/user', controller.sysuser.create);
  router.delete('/system/user/:id', controller.sysuser.destroy);

  // 菜单
  router.get('/menu/getRouters', controller.menu.getRouters);
  router.get('/system/menu/list', controller.menu.list);
  router.get('/system/menu/treeselect', controller.menu.treeselect);
  router.get('/system/menu/:id', controller.menu.show);
  router.put('/system/menu', controller.menu.modify);
  router.post('/system/menu', controller.menu.create);
  router.delete('/system/menu/:id', controller.menu.destroy);
  router.get('/system/menu/roleMenuTreeselect/:id', controller.menu.roleMenuTreeselect);

  // 字典管理
  router.get('/system/dict/type/list', controller.dictType.list);
  router.get('/system/dict/type/:dictId', controller.dictType.show);
  router.post('/system/dict/type', controller.dictType.create);
  router.put('/system/dict/type', controller.dictType.modify);
  router.delete('/system/dict/type/:dictId', controller.dictType.destroy);

  // 字典数据
  router.get('/system/dict/data/list', controller.dictData.list);
  router.get('/system/dict/data/dictType/:type', controller.dictData.showType);
  router.get('/system/dict/data/:dictId', controller.dictData.show);
  router.post('/system/dict/data', controller.dictData.create);
  router.put('/system/dict/data', controller.dictData.modify);
  router.delete('/system/dict/data/:dictCode', controller.dictData.destroy);

  // 角色
  router.get('/system/role/list', controller.sysrole.list);
  router.put('/system/role/changeStatus', checkIsAdmin, controller.sysrole.changeStatus);
  router.get('/system/role/:id', controller.sysrole.show);
  router.put('/system/role', checkIsAdmin, controller.sysrole.modify);
  router.post('/system/role', checkIsAdmin, controller.sysrole.create);
  router.delete('/system/role/:id', checkIsAdmin, controller.sysrole.destroy);
};

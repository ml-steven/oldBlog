import request from '@/utils/request'

// 登录方法
export function login(login_name, password, code, uuid) {
  const data = {
    login_name,
    password,
    code,
    uuid
  }
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/user/captchaImage',
    method: 'get'
  })
}
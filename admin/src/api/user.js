import request from '@/utils/axios'

export function getUsers() {
  return request({
    url: '/users',
    method: 'get'
  })
}

export function valiteLoginName(data) {
  return request({
    url: '/valiteLoginName',
    method: 'post',
    data:data
  })
}
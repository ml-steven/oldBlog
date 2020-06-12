import request from "~/plugins/axios"

export function getAllSims(params) {
    return request({
        url: '/api/terminal/queryAllDev',
        method: 'get',
        params
    })
}
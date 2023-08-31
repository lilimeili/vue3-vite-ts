import axios from 'axios'
import {getToken} from '@/util/util'
//创建axios 实例
const service = axios.create({
    baseURL: 'http://192.168.64.109:7350',
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charser=utf-8",
    }
})
//请求拦截
const TokenKey = 'vue_admin_template_token'
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsInNvdXJjZSI6InBjIiwidHlwZSI6Im1hbmFnZSIsImV4cCI6MTY5MzYzNzMwMSwic2lnbklkIjoiNThkZWU1ODY5ZDg5NGYwY2I5OGE4NTI0OWQ3YzNiYmIiLCJpYXQiOjE2OTMwMzI1MDF9.nMtGdD0rWQpttjt6lLMD3hDBgI9Fyzx4fgt3WSgYvwM'
// Cookies.set('token',token)


localStorage.setItem(TokenKey, JSON.stringify(token))
service.interceptors.request.use((config) => {
    // config.headers = config.headers || {}
    config.headers.token = token
    // if (localStorage.getItem('token')) {
    //     // config.headers.token.localStorage.getItem('token') || ""
    //     config.headers.token.getToken()
    // }
    return config //返回token,不然请求发不出去
})
service.interceptors.response.use((res) => {
    //先获取一下code
    const success: Boolean = res.data.success
    // if (!success) {
    //     return Promise.reject(res.data)
    // }
    return res.data
}, () => { })

export default service
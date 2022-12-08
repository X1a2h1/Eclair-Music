
// +----------------------------------------------------------------------
// | INIS [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2020~2021 http://inis.cc All rights reserved.
// +----------------------------------------------------------------------
// | Author: racns <email: racns@qq.com> <url: https://inis.cn>
// +----------------------------------------------------------------------
// | 作用：axios 网络请求封装
// +----------------------------------------------------------------------
import qs from 'qs';
import axios from 'axios';
import { inisHelper } from '../helper/helper.js';
const INIS = {
    api:'https://inisapi.crunl.cn/api',
    token: '47f8e3974a88cc31db69aec7904c262e'
}
// 创建 axios 对象
const instance = axios.create({
    baseURL: inisHelper.customProcessApi(INIS.api),
    timeout: 60 * 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',

    }
})

// 请求拦截
//   所有的网络请求都会先走这个方法
instance.interceptors.request.use(
    config => {
        config.headers = {
            ...config.headers,
            token:INIS.token
        }
        return config;
    })

// 响应拦截
//   所有的网络请求返回数据之后都会先执行这个方法
instance.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        return Promise.reject(err);
    }
)

// GET请求
export function GET(url, config = {}){
    return instance.get(url, config);
}

// DELETE请求
export function DEL(url, config = {}){
    return instance.delete(url, config);
}

// PUT请求
export function PUT(url, data = {}, config = {}){
    return instance.put(url, data, config);
}

// POST请求
export function POST(url, data = {}, config = {}){
    // params.token = INIS.token || ''
    if (Object.prototype.toString.call(data) === '[object Object]') data = qs.stringify({...data})
    return instance.post(url, data, config);
}

// PATCH请求
export function PATCH(url, data = {}, config = {}){
    return instance.patch(url, data, config);
}

// export function GET(url:string, params:any){
//     return new Promise((resolve, reject) => {
//         const paramsString = Object.keys(params)
//         .map(key =>
//             `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//         .join('&');
//         fetch(`${baseURL}/${url}?${paramsString}`, {
//             method: 'GET',
//             headers: {
//                 'Context-Type': 'application/json'
//             },
//         }).then(response => {
//             if(response.status >= 200 && response.status < 300) {
//                 resolve(response.json())
//             }else {
//                 reject(new Error('请求失败'));
//             }
//         }).catch(error => {
//             reject(new Error('网络异常'))
//         })
//     })
// }
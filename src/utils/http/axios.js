
import axios from "axios";
// import qs from "qs";

const serviceAxios = axios.create({
    // baseURL: 'https://api.bilibili.com/x/space/bangumi',
    // baseURL:'api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})


serviceAxios.interceptors.request.use(
    config => {
        config.headers['content-type'] = 'application/json'

        console.log('请求配置', config)
        return config
    },
    error => {
        Promise.reject(error)
    }
)

serviceAxios.interceptors.response.use(
    // (res) => {
    //     const data = res.data
    //     return data
    // },
    // (error) => {
    //     let message = res.data.code
    //     console.log(error)
    //
    // }
    response => {
        return response
    },
    err => {
        return Promise.reject(err);
    }
)

export function GET(url, config = {}) {
    return serviceAxios.get(url, config);
}
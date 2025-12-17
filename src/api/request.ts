import axios from "axios"
import type { AxiosInstance,AxiosResponse,InternalAxiosRequestConfig, } from "axios"
import {ElMessage} from 'element-plus'
// 封装请求函数

//配置axios实例
const service: AxiosInstance = axios.create({
    baseURL:'/api',
    timeout: 5000,   // 请求超时
});

//添加请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) =>{
        // 可以在这里添加请求头等操作
        return config
    },
    (error) =>{
        // 请求错误处理
        return Promise.reject(error)
    }
)

//添加响应拦截器
service.interceptors.response.use(
    (res: AxiosResponse) =>{
        // 可以在这里添加请求头等操作
        const {code,msg} = res.data
        if(code===200){
            //返回res
            return res
        }else{
            const NETWWORK_ERROR = '网络请求异常,请稍后重试'
            ElMessage.error(msg || NETWWORK_ERROR)
            return Promise.reject(msg || NETWWORK_ERROR)
        }
    }
)

//核心方法
export default function request(options:any){
    options.method = options.method || 'get'
    // //get
    // if(options.method.toLowerCase() === 'get'){
    //     options.params = options.data
    // }
    return service(options)
}
//整个项目api接口管理
import request from "./request";


//请求获取表格数据
export  function fetchTableData(){
    return request({
        url:'/home/getTableData',
        method:'get',
    })
}

//请求获取金额数据
export  function fetchCountData(){
    return request({
        url:'/home/getCountData',
        method:'get',
    })
}

//请求获取Echrts数据
export  function fetchEchartsData(){
    return request({
        url:'/home/getEchartsData',
        method:'get',
    })
}

//请求获取用户表单数据
export  function fetchUserTableData(params:any){
    return request({
        url:'/home/getUserTableData',
        method:'get',
        params,
    })
}

//请求删除用户表单数据
export function deleteUser(params:any){
    return request({
        url:'/home/deleteUser',
        method:'get',
        params,
    }) 
}

//增添用户 用post 数据在body里
export function addUser(data:any){
    return request({
        url:'/home/addUser',
        method:'post',
        data,
    }) 
}

//编辑用户
export function updateUser(data:any){
    return request({
        url:'/home/updateUser',
        method:'post',
        data,
    }) 
}

//
export  function fetchPermission(data:any){
    return request({
        url:'/home/getMenu',
        method:'post',
        data,
    })
}

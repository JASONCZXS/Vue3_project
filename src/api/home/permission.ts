import Mock from "mockjs";
import type { MenuType } from '@/type/menutype'

export default {
    getMenu:(config:any) =>{
        const { username, password } = JSON.parse(config.body)
        if(username === 'admin' && password === '123456'){
            return {
                code:200,
                message:'success',
                token:Mock.Random.guid(),
                data:{
                    menuList:[
                            {
                                name:'home',
                                path:'/home',
                                label:'首页',
                                icon:'HomeFilled',
                                url:'Home',
                            },
                            {
                                name:'mall',
                                path:'/mall',
                                label:'商品管理',
                                icon:'Goods',
                                url:'Mall',
                            },
                            {
                                name:'user',
                                path:'/user',
                                label:'用户管理',
                                icon:'UserFilled',
                                url:'User',
                            },
                            {
                                name:'other',
                                path:'/other',
                                label:'其他',
                                icon:'MoreFilled',
                                children:[
                                    {
                                        name:'page1',
                                        path:'/page1',
                                        label:'页面1',
                                        icon:'Histogram',
                                        url:'Page1',
                                    },
                                    {
                                        name:'page2',
                                        path:'/page2',
                                        label:'页面2',
                                        icon:'Comment',
                                        url:'Page2',
                                    },
                                ]
                            }
                    ] as MenuType[],
                }
            }
        }else if(username === 'user' && password === '123456'){
            return {
                code:200,
                message:'success',
                token:Mock.Random.guid(),
                data:{
                    menuList:[
                            {
                                name:'home',
                                path:'/home',
                                label:'首页',
                                icon:'HomeFilled',
                                url:'Home',
                            },
                            {
                                name:'user',
                                path:'/user',
                                label:'用户管理',
                                icon:'UserFilled',
                                url:'User',
                            },
                            {
                                name:'other',
                                path:'/other',
                                label:'其他',
                                icon:'MoreFilled',
                                children:[
                                    {
                                        name:'page1',
                                        path:'/page1',
                                        label:'页面1',
                                        icon:'Histogram',
                                        url:'Page1',
                                    },
                                    {
                                        name:'page2',
                                        path:'/page2',
                                        label:'页面2',
                                        icon:'Comment',
                                        url:'Page2',
                                    },
                                ]
                            }
                    ] as MenuType[],
                }
            }
        }else{
            return {
                code:-999,
                message:'账号或密码错误',
            }
        }
    },
}
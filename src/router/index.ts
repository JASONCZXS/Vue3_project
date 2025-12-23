import {createRouter,createWebHashHistory,} from 'vue-router'
// 引入类型 import type RouteRecordRaw 是类型
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 配置路由信息
const routes:RouteRecordRaw[] = [
    // 主页面
    {
        path:'/',
        name:'main',
        // 懒加载
        component:()=>import('@/views/Main.vue'),
        // 访问根路径时，默认重定向到home页面
        redirect:'/home',
        children:[],
    },
    // 登录页面
    {
        path:'/login',
        name:'login',
        component:()=>import('@/views/Login.vue')
    },
    // 404页面
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFound.vue'),
    },
];


// 创建路由实例
const router = createRouter({
    history:createWebHashHistory(),
    routes
});

//路由守卫
router.beforeEach((to,from,next)=>{
    const userStore = useUserStore()
    if(to.path !== '/login' && !userStore.token){
        next('/login')
        return
    }
    next()
})


// 导出路由实例
export default router;

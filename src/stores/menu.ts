import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            isCollapse: false,
            tags:[
                {
                    path:'/home',
                    name:'home',
                    label:'首页',
                    icon:'home',
                },
            ],
            currentMenu:null,
            menuList:[],
            routeList:[] as string[],   
        }
    },
    actions: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        selectMenu(val:any){
            if(val.name === 'home'){
                this.currentMenu = null
            }else{
                const index = this.tags.findIndex(item => item.name === val.name)
                index === -1 ? this.tags.push(val) : ""              
            }
        },
        updateMenu(val:any){
            let index = this.tags.findIndex(item => item.name === val.name)
            this.tags.splice(index,1)
        },
        // 动态添加路由
        addMenu(router: any){
            const menuList = this.menuList
            const routeArr:RouteRecordRaw[] = [] 
            const modules = import.meta.glob('../views/**/*.vue')
            menuList.forEach((item:any)=>{
                if(item.children){
                    item.children.forEach((val:any) => {
                        let url = `../views/${val.url}.vue`
                        val.component = modules[url]
                        routeArr.push(val)
                    })
                }else{
                    let url = `../views/${item.url}.vue`
                    item.component = modules[url]
                    routeArr.push(item)
                }
            })
            //清除之前添加的路由
            let routers = router.getRoutes()
            routers.forEach((item:any)=>{
                if(item.name === 'main' || item.name === 'login' || item.name === 'notfound'){
                    return
                }else{
                    router.removeRoute(item.name)
                }
            })
            // 路由的动态添加
            routeArr.forEach((item)=>{
                router.addRoute('main',item)
                this.routeList.push(item.name as string)  
            })
        },
        // 清除路由
        clearMenu(router: any) {
            this.routeList.forEach(name => {
              if (router.hasRoute(name)) {
                router.removeRoute(name)
              }
            })
            this.routeList = []
            this.menuList = []
            this.tags = []
            this.currentMenu = null
            this.isCollapse = false
            localStorage.clear()
        },
        
    },
    persist:true,
})   
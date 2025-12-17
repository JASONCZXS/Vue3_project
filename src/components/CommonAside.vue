<script setup lang="ts">
import { computed } from 'vue'
// 引入Pinia状态管理
import { useMenuStore } from '@/stores/menu'
//
import { useRoute,useRouter } from 'vue-router'
// 使用Sidebar状态
const sidebar = useMenuStore()
// 计算属性：有无子菜单分类
const noChildren = computed(()=>{
  return sidebar.menuList.filter((item:any) =>!item.children)
})
const hasChildren = computed(()=>{
  return sidebar.menuList.filter((item:any) =>item.children&&item.children.length>0)
})

const activeMenu = computed(() =>{
    route.path
})

const route = useRoute()
const router = useRouter()

const handleMenu = (item:any) =>{
    router.push(item.path)
    sidebar.selectMenu(item)
}
</script>

<template>
    <div>
        <el-aside width="180px" class="common-aside">
            <el-menu
            background-color="#444"
            text-color="#fff"
            collapse-transition="true"
            :default-active="activeMenu"
            :collapse="sidebar.isCollapse"
            >            
                <!-- 遍历无子菜单 -->
                <el-menu-item
                v-for="item in noChildren"
                :index="item.path"
                :key="item.path"
                @click="handleMenu(item)"
                >
                <!-- 动态图标 -->
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </el-menu-item>
                <!-- 遍历有子菜单 --> 
                <el-sub-menu 
                v-for="item in hasChildren"
                :index="item.path"
                :key="item.path"
                >
                    <!-- 标题 -->
                    <template #title>
                        <component class="icons" :is="item.icon"></component>
                        <span>{{ item.label }}</span>
                    </template>
                    <!-- 遍历子页面 -->
                    <el-menu-item-group>
                        <el-menu-item 
                        v-for="(subItem,) in item.children"
                        :index="subItem.path"
                        :key="subItem.path"
                        @click="handleMenu(subItem)"
                        >
                            <component class="icons" :is="subItem.icon"></component>
                            <span>{{ subItem.label }}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </el-aside>
    </div>
</template>



<style lang="less" scoped>
.icons{
    width: 25px;
    height: 25px;
    margin-right: 8px;
}
.el-menu:not(.el-menu--collapse){
    width: 180px;
    border-right: none;
    background-color: #444;
    color: #fff;
}
.common-aside{
    background-color: #444;
    height: 100%;
    width: 100%;
}
</style>
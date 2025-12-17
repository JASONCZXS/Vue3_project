<script setup lang="ts">
import type {UserType} from '@/type/usertype'
import {useMenuStore} from '@/stores/menu'
import { useUserStore } from '@/stores/user'
import router from '../router'
const sidebar = useMenuStore()
const userStore = useUserStore()
const menu:string = 'Switch'
const message = 'Message'
const getUserImg = (user:UserType): string =>{
    return new URL(`../assets/user/${user.icon}.png`,window.location.href).href
}
const handleLoginOut = () =>{
    router.replace('/login')
    sidebar.clearMenu(router)
    userStore.clean()
}
</script>



<template>
    <div class="header">
        <!-- 左侧导航栏 -->
        <div class="left-content">
            <h3>VUE3后台管理</h3>
            <!-- 切换菜单 -->
            <el-button>
                <component class="icons" :is="menu" @click="sidebar.toggleCollapse"></component> 
            </el-button>
            <!-- Breadcrumb 面包屑 -->
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 右侧头像及下拉菜单 -->
        <div class="right-content">
            <el-dropdown class="messageDrop">
                <!-- 消息提醒 -->
                <component class="icons" :is="message" style="outline: none;"></component>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>新消息</el-dropdown-item>
                    <el-dropdown-item>已读消息</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-dropdown class="userDrop">
                <!-- 用户头像 -->
                <span class="el-dropdown-link">
                    <img src="../assets/image/user1.png" alt="用户头像" class="userIcon">
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLoginOut">登出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div>
                <span style="color:#fff; margin-left:8px;">你好</span>
            </div>
        </div>
    </div>
</template>



<style lang="less" scoped>
.icons{
    width: 15px;
    height: 15px;
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: #333;
    .left-content{
        display: flex;
        align-items: center;
        gap: 20px;
        h3{
            color: #fff;
            text-align: center;
            padding: 15px 0;
            margin: 0;
            font-weight: normal;
            font-size: 18px;
            border-bottom: 1px solid #444;
            width: 160px;
        }
        :deep(.bread span){
            cursor: pointer !important;
            color: #fff !important;
        }
    }
    .right-content{
        display: flex;
        align-items: center;
        margin-right: 20px;
        .icons{
            width: 25px;
            height: 25px;
            color: #fff;
            margin-right: 35px;
        }
    }
    .userIcon{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

</style>
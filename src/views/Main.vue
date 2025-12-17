<script setup lang="ts">
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTab from '@/components/CommonTab.vue';
</script>
<template>
    <div class="common-layout">
        <!-- 整体 -->
        <el-container class="lay-container">
            <!-- 头部 -->
            <el-header class="el-header">
                <common-header/>
            </el-header>
            <!-- 内容 -->
            <el-container>
                <!-- 左侧导航栏 -->
                <common-aside/>
                <!-- 右侧主要内容区 -->
                <el-main class="right-main">
                    <common-tab/>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style lang="less" scoped>
.common-layout .lay-container{
    min-height:100vh;
}
.el-header{
    background-color: #333;
    padding: 0;
}
.right-main{
    background-color: rgb(242, 241, 241);
}
</style>
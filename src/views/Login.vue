<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { fetchPermission } from '@/api/api';
import { useMenuStore } from '@/stores/menu';
import router from '@/router'

const { loginForm } = useUserStore();
const userStore = useUserStore();
const menuStore = useMenuStore();
const handleLogin = async () => {
  try {
    const res = await fetchPermission(loginForm)

    if (res.data.code === 200) {
      ElMessage.success('登录成功')

      userStore.token = res.data.token
      menuStore.menuList = res.data.data.menuList

      // 等 router 处理完动态路由
      menuStore.addMenu(router)
      await router.replace('/home')
    }
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名或密码')
  }
}


</script>



<template>
    <div class="login-body">
        <el-form :model="loginForm" ref="loginFormRef" class="login-form">
            <h3>VUE3后台管理登录</h3>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>



<style lang="less" scoped>
.login-body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;

  .login-form {
    width: 360px;
    padding: 40px 32px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    h3 {
      text-align: center;
      font-size: 22px;
      font-weight: 500;
      color: #202124;
      margin-bottom: 24px;
    }

    .el-form-item {
      margin-bottom: 20px;
    }

    /* 输入框 */
    .el-input__wrapper {
      border-radius: 4px;
      box-shadow: none;
      border: 1px solid #dadce0;
      transition: border-color 0.2s;

      &:hover {
        border-color: #1a73e8;
      }

      &.is-focus {
        border-color: #1a73e8;
      }
    }

    .el-input__inner {
      height: 44px;
      font-size: 14px;
      color: #202124;
    }

    /* 登录按钮 */
    .el-button {
      width: 100%;
      height: 44px;
      font-size: 15px;
      font-weight: 500;
      border-radius: 4px;
    }

    .el-button--primary {
      background-color: #1a73e8;
      border-color: #1a73e8;

      &:hover {
        background-color: #1765cc;
        border-color: #1765cc;
      }

      &:active {
        background-color: #1558b0;
        border-color: #1558b0;
      }
    }
  }
}
</style>
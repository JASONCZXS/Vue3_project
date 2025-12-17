<script setup lang="ts">
import { ref,onMounted,reactive, nextTick} from 'vue';
import { fetchTableData,fetchCountData,fetchEchartsData } from '@/api/api'
import * as echarts from 'echarts';
import { useUserStore } from '@/stores/user';
//数据
const tableData = ref([])
const tableLabels = ref({})
const countData = ref([])
const userStore = useUserStore()
//Echarts配置项
//observer 接收观察器实例对象
const chartPlot = ref(null)
const chartBar = ref(null)
const chartPie = ref(null)
const observer = ref(null)
//公共配置项
//折现与柱状图
const xOptions = reactive({
    //图例文字颜色
    textStyle:{
        color:"#333",
    },
    legend:{},
    grid:{
        left:"20%",
    },
    //提示框
    tooltip:{
        trigger:"axis",
    },
    xAxis:{
        type:"category",
        data:[],
        axisLine:{
            lineStyle:{
                color:"#17b3a3",
            },
        },
        axisLabel:{
            interval:0,
            color:"#333",
        },   
    },
    yAxis:[
        {
            type:"value",
            axisLine:{
                lineStyle:{
                    color:"#17b3a3",
                },
            },
        },
    ],
    color:["#2ec7c9","#b6a2de","#5abe1f","#ffb980","#d87a80","#8d98b3",],
    series:[],
})
//饼状图
const pieOptions = reactive({
    tooltip:{
        trigger:"itme",
    },
    color:["#2ec7c9","#b6a2de","#5abe1f","#ffb980","#d87a80","#8d98b3","#39c362",],
    series:[],
})
//在Mounted时候挂载
onMounted(() => {
  loadTableData()
  loadCountData()
  loadEchartsData()
})
//调用载入table数据
async function loadTableData() {
  try {
    const res = await fetchTableData()
    if (res.data.code === 200) {
      tableData.value = res.data.data.tableData
      tableLabels.value = res.data.data.tableLabels
    }
  } catch (error) {
    console.error('获取表格数据失败:', error)
  }
}
//调用载入Count数据
async function loadCountData() {
  try {
    const res = await fetchCountData()
    if (res.data.code === 200) {
      countData.value = res.data.data.countData
    }
  } catch (error) {
    console.error('获取表格数据失败:', error)
  }
}
//调用载入Echarts数据
async function loadEchartsData() {
  try {
    const res = await fetchEchartsData()
    if (res.data.code === 200) {
      const{orderData,videoData,userData} = res.data.data
      
      //折线图渲染
      xOptions.xAxis.data = orderData.date
      //所有手机品牌名称Object.keys(orderData.data[0])
      xOptions.series = Object.keys(orderData.data[0]).map(val =>({
        name:val,
        type:"line",
        //该品牌每天的销量，从第一天到第七天
        data:orderData.data.map(item =>item[val]),
      }))
      //初始化实例对象
      const plotEcharts = echarts.init(chartPlot.value)
      //导入配置渲染
      plotEcharts.setOption(xOptions)
      
      //柱状图渲染
      xOptions.xAxis.data = userData.map(item =>item.date)
      xOptions.series = [
        {
            name:'新增用户',
            type:'bar',
            data:userData.map(item =>item.new),
        },
        {
            name:'活跃用户',
            type:'bar',
            data:userData.map(item =>item.active),
        },
      ]
      const barEcharts = echarts.init(chartBar.value)
      //导入配置渲染
      barEcharts.setOption(xOptions)
      
      //柱状图渲染
      pieOptions.series = [
        {
            data:videoData,
            type:'pie',
        }
      ]
      const pieEcharts = echarts.init(chartPie.value)
      //导入配置渲染
      pieEcharts.setOption(pieOptions)

      //监听页面变化 随页面变化变图表 如果监听的容器大小发生变化 调用回调函数
      observer.value = new ResizeObserver(() =>{
        plotEcharts.resize()
        barEcharts.resize()
        pieEcharts.resize()
      })
      //容器存在
      if(chartPlot.value){
        observer.value.observe(chartPlot.value)
      }
    }
  } catch (error) {
    console.error('获取表格数据失败:', error)
  }
}


</script>


<template>
    <div>
        <!-- 首页内容 -->
        <el-row class="home" :gutter="20">
            <!-- 左侧卡片组 -->
            <el-col :span="8" style="margin-top: 20px;" class="left-col">
                <!-- 卡片组件 -->
                <el-card shadow="hover" class="user-table">
                    <div class="userCard">
                        <!-- 头像 -->
                        <img src="../assets/image/user1.png" alt="用户头像" class="userIcon">
                        <!-- 用户信息 -->
                        <div class="user-info">
                            <p class="user-name">{{ userStore.loginForm.username }}</p>
                            <p class="user-role">{{ userStore.loginForm.username }}</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间: <span>2025</span></p>
                        <p>上次登录IP: <span>kyoto</span></p>
                    </div>
                </el-card>                
                <el-card shadow="hover" class="user-table">
                    <el-table :data="tableData" stripe>
                        <!-- prop要和tableData的数据字段对应 -->
                        <el-table-column
                        v-for="(value,key) in tableLabels"
                        :key="key"
                        :prop="key"
                        :label="value"
                        >
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <!-- 右侧卡片组 -->
            <el-col :span="16" style="margin-top: 20px;" class="right-col">
                <div class="countCard">
                    <el-card 
                        v-for="item in countData"
                        :key="item.name"
                        shadow="hover"
                        >
                            <div class="el-card_body">
                                <component :is="item.icon" class="icon" :style="{ background: item.color }"></component>
                                <div class="detail">
                                    <p class="num">￥{{ item.value }}</p>
                                    <p class="text">{{ item.name }}</p>
                                </div>
                            </div>
                    </el-card>
                </div>
                <el-card class="plot-echart" shadow="hover">
                    <div ref="chartPlot" style="height: 220px;">
                    </div>
                </el-card>
                <div class="graph">
                    <el-card shadow="hover">
                        <div ref="chartBar" style="height: 200px;"></div>
                    </el-card>
                    <el-card shadow="hover">
                        <div ref="chartPie" style="height: 200px;"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<style lang="less" scoped>
.home{
    height: 100%;
    overflow: hidden;
    .userCard{
        display: flex;
        align-items: center;
        border-bottom: 2px solid #eee;
        .userIcon{
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 45px;
        }
        .user-info{
            p{
                margin: 0;
                line-height: 1.5;
            }
            .user-name{
                font-size: 30px;
                font-weight: bold;
            }
            .user-role{
                font-size: 13px;
                color: #666;
            }   
        }
    }
    .login-info{
        margin-top: 20px;
        p{
            margin: 0;
            line-height: 1.5;
            span{
                font-weight: bold;
            }
        }
    }
    .user-table{
        margin-top: 20px;
    }
    .countCard{
        display: flex;
        padding:0;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 20px;
        .el-card{
            width: 30%;
            margin-bottom: 5px;
            margin-left: 5px;
            .el-card_body {
                display: flex;
                align-items: center;  // 垂直居中
                padding: 0;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        }
        .icon{
            width: 50px;
            height: 50px;
            font-size: 20px;
            line-height: 50px;
            border-radius: 5px;
        }
        .detail {
            margin-left: 5px;

            .num {
                font-size: 20px;
                margin: 0;
            }

            .text {
                font-size: 14px;
                margin-left: 10px ;
                color: #666;
            }
        }
    }
    .plot-echart{
        margin-top: 10px;
    }
    .graph{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .el-card{
            width: 48%;
            height: 240px;
        }
    }
}
</style>
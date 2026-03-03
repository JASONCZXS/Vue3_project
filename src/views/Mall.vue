<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchMallGoodsList } from '@/api/api'
import type { MallGoodsType } from '@/type/malltype'
import { ElMessage } from 'element-plus'

const loading = ref(true)
const goodsList = ref<MallGoodsType[]>([])

onMounted(() => {
    loadGoodsList()
})

async function loadGoodsList() {
    loading.value = true
    try {
        const res = await fetchMallGoodsList()
        goodsList.value = res.data.data.list as MallGoodsType[]
    } catch (error) {
        console.error('获取商品列表失败:', error)
        ElMessage({
            showClose: true,
            message: '获取商品列表失败',
            type: 'error',
        })
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="mallPage">
        <div class="mallHeader">
            <div class="title">商品管理</div>
            <el-button type="primary" @click="loadGoodsList" :loading="loading">刷新</el-button>
        </div>

        <el-skeleton :loading="loading" animated>
            <template #template>
                <el-row class="goodsGrid" :gutter="16">
                    <el-col v-for="n in 8" :key="n" :xs="24" :sm="12" :md="8" :lg="6">
                        <el-card shadow="hover" class="goodsCard">
                            <el-skeleton-item variant="image" style="width: 100%; height: 140px" />
                            <div class="meta">
                                <el-skeleton-item variant="h3" style="width: 70%" />
                                <el-skeleton-item variant="text" style="width: 92%; margin-top: 10px" />
                                <el-skeleton-item variant="text" style="width: 60%; margin-top: 10px" />
                                <div class="skeletonTags">
                                    <el-skeleton-item variant="text" style="width: 64px" />
                                    <el-skeleton-item variant="text" style="width: 64px" />
                                    <el-skeleton-item variant="text" style="width: 64px" />
                                </div>
                            </div>
                            <div class="footer">
                                <el-skeleton-item variant="button" style="width: 80px" />
                                <el-skeleton-item variant="button" style="width: 80px" />
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </template>

            <template #default>
                <el-row class="goodsGrid" :gutter="16">
                    <el-col v-for="item in goodsList" :key="item.id" :xs="24" :sm="12" :md="8" :lg="6">
                        <el-card shadow="hover" class="goodsCard">
                            <img class="cover" :src="item.cover" :alt="item.name" />
                            <div class="meta">
                                <div class="name">{{ item.name }}</div>
                                <div class="desc">{{ item.desc }}</div>
                                <div class="priceRow">
                                    <div class="price">￥{{ item.price }}</div>
                                    <div class="stock">库存 {{ item.stock }}</div>
                                </div>
                                <div class="tags">
                                    <el-tag v-for="t in item.tags" :key="t" size="small" effect="plain">{{ t }}</el-tag>
                                </div>
                            </div>
                            <div class="footer">
                                <el-button size="small" type="primary">编辑</el-button>
                                <el-button size="small">详情</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </template>
        </el-skeleton>
    </div>
</template>

<style lang="less" scoped>
.mallPage{
    padding-top: 10px;
}
.mallHeader{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title{
        font-size: 16px;
        font-weight: bold;
        color: #333;
    }
}
.goodsGrid{
    margin-top: 12px;
}
.goodsCard{
    margin-bottom: 16px;
    .cover{
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 6px;
        display: block;
    }
    .meta{
        padding-top: 10px;
        .name{
            font-size: 14px;
            font-weight: 600;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .desc{
            margin-top: 6px;
            font-size: 12px;
            color: #666;
            line-height: 1.4;
            height: 34px;
            overflow: hidden;
        }
        .priceRow{
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price{
                color: #f56c6c;
                font-weight: bold;
            }
            .stock{
                font-size: 12px;
                color: #999;
            }
        }
        .tags{
            margin-top: 10px;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        .skeletonTags{
            margin-top: 10px;
            display: flex;
            gap: 8px;
        }
    }
    .footer{
        margin-top: 12px;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }
}
</style>
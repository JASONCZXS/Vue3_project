<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import {useMenuStore} from '@/stores/menu'

const route = useRoute()
const router = useRouter()
const tagsStore = useMenuStore()
const tags = computed(() =>tagsStore.tags )

const handleMnue = (item:any) =>{
    router.push(item.path)
    tagsStore.selectMenu(item)
}
const handleClose = (item:any,index:any) =>{
    const isCurrent = item.name === route.name
    // 先删除
    tagsStore.updateMenu(item)

    // 如果不是当前页，直接结束
    if (!isCurrent) return
    const tags = tagsStore.tags
    // 情况 1：还有左边
    if (index - 1 >= 0 && tags[index - 1]) {
      const target = tags[index - 1]
      tagsStore.selectMenu(target)
      router.push(target.path)
      return
    }
    // 情况 2：还有右边
    if (tags[index]) {
      const target = tags[index]
      tagsStore.selectMenu(target)
      router.push(target.path)
      return
    }
    // 情况 3：一个都没有了（兜底）
    router.push('/home')
}
</script>



<template>
    <div class="tab">
        <el-tag
        v-for="(tag,index) in tags"
        :key="tag.name"
        :closable="tag.name !== 'home'"
        :effect="route.name === tag.name ? 'dark' : 'plain'"
        @click="handleMnue(tag)"
        @close="handleClose(tag,index)"
        >
        {{ tag.label }}
        </el-tag>
    </div>
</template>



<style scoped>
.tab{
    margin: 10px 0 0 0;
}
.el-tag{
    margin-left: 10px;
    cursor: pointer;
}
</style>
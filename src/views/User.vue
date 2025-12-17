<script setup lang="ts">
import { reactive,ref,onMounted,nextTick } from 'vue'
import { fetchUserTableData, deleteUser, addUser, updateUser } from '@/api/api'
import { ElMessage, type FormInstance } from 'element-plus'
import type { UserTableType } from '@/type/usertabletype'
const userList = ref([])
const action = ref('add')
const dialogVisible = ref(false)
//表单提交的数据
const formUser = reactive<UserTableType>({})
//表单的实例
const userForm = ref<FormInstance|null>(null)
//表单验证
const rules = reactive({
    name:[{ required: true, message: "姓名是必填项", trigger: "blur", }],
    age:[{ required: true, message: "年龄是必填项", trigger: "blur", },
        { type:"number", message: "年龄必须是数字", transform: (value:string) => Number(value) }
    ],
    gender:[{ required: true, message: "性别是必填项", trigger: "blur", }],
    birthday:[{ required: true, message: "生日是必填项", trigger: "blur", }],
    address:[{ required: true, message: "地址是必填项", trigger: "blur", }],
})
const formInline = reactive({
    keyWord:''
})
//表格标签列表
const labelList = reactive([
    {
        prop:'name',
        label:'姓名',
    },
    {
        prop:'age',
        label:'年龄',
    },
    {
        prop:'genderLabel',
        label:'性别',
    },
    {
        prop:'birthday',
        label:'出身日期',
        width:200,
    },
    {
        prop:'address',
        label:'住址',
        width:400,
    },
])
const config = reactive({
    name:'',
    total:0,
    page:1,
})
const handleSearch = () =>{
    config.name = formInline.keyWord
    loadUserTableData(config)
}
const hanldechange = (page:any) =>{
    config.page = page
    loadUserTableData(config)
}
const handleDelete = (params:any) =>{
    ElMessageBox.confirm("确定删除吗").then(async() =>{
        await deleteUser({id:params.id})
        ElMessage({
            showClose:true,
            message:'删除成功',
            type:'success',
        })
        loadUserTableData()
    })
}
const handleClose = () =>{
    //获取表单重置表单内
    dialogVisible.value = false
    userForm.value.resetFields()
}
const handleCancel = () =>{
    dialogVisible.value = false
    userForm.value.resetFields()
}
const handleAdd = () =>{
    dialogVisible.value = true
    action.value = 'add'
}
const handleEdit = (val:any) =>{
    action.value = 'edit'
    dialogVisible.value = true
    //等页面（DOM + el-form）渲染完成之后，再把编辑数据灌进表单
    nextTick(()=>{
        Object.assign(formUser,{...val,})
        console.log(formUser);
    }) 
}
const timeFormat = (time:Date) =>{
    var time = new Date(time)
    var year = time.getFullYear()
    var month = time.getMonth()
    var date = time.getDate()
    function add(m:any){
        return m < 10? "0"+m : m
    }
    return year+"-"+add(month)+"-"+add(date)
}
const onSubmit = () =>{
    //校验
    if (!userForm.value) return
    try {
        userForm.value.validate(async (vaild) =>{
            if(vaild){
                formUser.birthday = /^\d{4}-\d{2}-\d{2}$/.test(formUser.birthday)? formUser.birthday : timeFormat(formUser.birthday)
                if(action.value === 'add'){
                    await addUser(formUser)
                }else{
                    await updateUser(formUser)
                }
                dialogVisible.value = false
                userForm.value.resetFields()
                loadUserTableData()
            }
        })   
    } catch (err) {
    //校验失败
        console.log('校验失败')
        ElMessage({
            showClose:true,
            message:'请输入正确的内容',
            type:'error',
        })
    }
}

//挂在时加载表格数据
onMounted(()=>{
    loadUserTableData()
})

//加载用户表格
async function loadUserTableData() {
  try {
    const res = await fetchUserTableData(config)
    if (res.data.code === 200) {
        userList.value = res.data.data.list.map(item =>({
            ...item,
            genderLabel: item.gender === 1 ? '男' : '女'
        }))
        config.total = res.data.data.count
    }
  } catch (error) {
    console.error('获取表格数据失败:', error)
  }
}

</script>



<template>
    <div class="userListPage">
        <div class="user-header">
            <el-button type="primary" @click="handleAdd" >新增</el-button>
            <el-form :inline="true" :model="formInline">
                <el-form-item label="查找">
                    <el-input placeholder="请输入用户名" v-model="formInline.keyWord"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="user-table"> 
            <el-table :data="userList" style="width: 100%">
                <el-table-column
                v-for="item in labelList"
                :key="item.prop"
                :width="item.width? item.width: 125"
                :prop="item.prop"
                :label="item.label"
                />
                <el-table-column fixed="right" label="选项" min-width="120">
                <!-- #="scope" 是 Vue 的 作用域插槽语法，
                scope 是子组件（如 el-table）向插槽暴露的数据对象，
                scope.row 表示当前行数据， -->
                    <template #="scope">
                    <el-button  type="primary" size="small" @click="handleEdit(scope.row)" >
                      编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
            class="pager" 
            background 
            layout="prev, pager, next, jumper" 
            size="small"
            :total="config.total" 
            @current-change="hanldechange"
            />
        </div>
        <!-- 弹窗 -->
        <el-dialog
        v-model="dialogVisible"
        :title=" action == 'add'?'新增用户':'编辑用户' "
        width="35%"
        :before-close="handleClose"
        >
            <el-form :model="formUser" :rules="rules" ref="userForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="formUser.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model="formUser.age" placeholder="请输入年龄"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="formUser.gender" placeholder="请选择" class="select-clearn">
                                <!-- :value只要不是字符串就一定要加 : -->
                                <el-option label="女" :value="0" />
                                <el-option label="男" :value="1" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker
                                v-model="formUser.birthday"
                                type="date"
                                placeholder="选择日期"
                                style="width: 100%"
                            />
                        </el-form-item>
                    </el-col>                   
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="地址" prop="address">
                            <el-input v-model="formUser.address" placeholder="请输入地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="justify-content: flex-end;" >
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button type="danger" @click="handleCancel">取消</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>



<style scoped lang="less">
.user-header{
    display: flex;
    justify-content: space-between;
}
.userListPage{
    margin-top: 10px;
}
</style>
import Mock from "mockjs";
import type { UserTableType } from '@/type/usertabletype'

//查询功能 get从url取数据 post从body取数据
function param2Obj(url){
    const search = url.split('?')[1]
    if(!search){
        return {}
    }
    return JSON.parse(
        '{"'+
        decodeURIComponent(search)
            .replace(/"/g,'\\"')
            .replace(/&/g,'","')
            .replace(/=/g,'":"')+
        '"}'
    )
}



let List:UserTableType[] = []

const counts:number = 200
//模拟200条数据
for(let i = 0; i < counts ; i++ ){
    List.push(
        Mock.mock({
            id:Mock.Random.guid(),
            name:Mock.Random.cname(),
            address:Mock.mock('@county(true)'),
            'age|18-60':1,
            birthday:Mock.Random.date(),
            gender:Mock.Random.integer(0,1),
        })
    )
}

export default {
    getUserTableData:(config:any) =>{
        const {name,page = 1,limit = 10} = param2Obj(config.url)
        //筛选
        const mockList = List.filter(user =>
            //没传 name → 不过滤（全部保留）传了 name → 只保留包含 name 的
            !name || user.name.includes(name)
        )
        //分页
        const pageList = mockList.filter((item,index) => index< limit * page && index >= limit * (page - 1))
        
        return {
            code:200,
            message:'success',
            data:{
                list:pageList,
                count: mockList.length,
            }
        }
    },
    deleteUser:(config:any) =>{
        //不解构是“对象”和“字符串”在比
        const { id } = param2Obj(config.url)     
        if(!id){
            return{
                code:-999,
                message:'参数不正确',
            }
        }else{
            List = List.filter(item => item.id !== id)  
            return{
                code:200,
                message:'删除成功',
            }
        }
    },
    addUser:(config:any) =>{
        const { name, address, age, gender, birthday } = JSON.parse(config.body)
        List.unshift({
            id: Mock.Random.guid(),
            name:name,
            address:address,
            age:age,
            birthday:birthday,
            gender:gender,
        })
        return{
            code:200,
            data:{
                message:'添加成功',
            }
        }
    },
    updateUser:(config:any) =>{
        const { id, name, address, age, gender, birthday } = JSON.parse(config.body)
        const gender_num = parseInt(gender)
        List.some(u =>{
            if( u.id === id ){
                u.name = name
                u.address = address
                u.age = age
                u.gender = gender_num
                u.birthday = birthday
                console.log(u);
                return true
            }
        })
        return{
            code:200,
            data:{
                message:'编辑成功'
            }
        }
    }
}
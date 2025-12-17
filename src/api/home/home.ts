
import type { TableType } from '@/type/tabletype';
import type { CountType } from'@/type/counttype';
import type { GoodsType, VideoType, UserDataType } from '@/type/echartstype'
//1.拦截路径 2.请求方式 3.返回数据
export default {
    getTableData:() =>{
        return {
            code:200,
            message:'success',
            data:{
                tableData:[
                    { name: '食品', todayBuy: 100, monthBuy: 800, totalBuy: 1200 },
                    { name: '衣服', todayBuy: 200, monthBuy: 600, totalBuy: 1100 },
                    { name: '电子产品', todayBuy: 300, monthBuy: 400, totalBuy: 900 },
                    { name: '家具', todayBuy: 400, monthBuy: 300, totalBuy: 700 },
                    { name: '玩具', todayBuy: 500, monthBuy: 200, totalBuy: 500 },
                ] as TableType[],
                tableLabels:{
                    name:'商品名称',
                    todayBuy:'今日购买',
                    monthBuy:'本月购买',
                    totalBuy:'总购买'
                } as Record<keyof TableType,string>,
            }
        }
    },
    getCountData:() =>{
        return {
            code:200,
            message:'success',
            data:{
                countData:[
                    { name:'本月支出', value:2312, icon:'Handbag', color:'#2ec7c9' },
                    { name:'本月收入', value:6400, icon:'Money', color:'#ffb980' },
                    { name:'本月未支付', value:834, icon:'CreditCard', color:'#5ab1ef' },
                    { name:'本年支出', value:2231, icon:'Handbag', color:'#2ec7c9' },
                    { name:'本年收入', value:52310, icon:'Money', color:'#ffb980' },
                    { name:'本年未支付', value:1133, icon:'CreditCard', color:'#5ab1ef' },
                ] as CountType[],
            }
        }
    },
    getEchartsData:() =>{
        return {
            code:200,
            message:'success',
            data:{
                orderData:{
                    date:[
                        "2025-10-01",
                        "2025-10-02",
                        "2025-10-03",
                        "2025-10-04",
                        "2025-10-05",
                        "2025-10-06",
                        "2025-10-07",
                    ] as string[],
                    data:[
                        {
                            "Apple":3298,
                            "OnePlus":2334,
                            "SamSung":1234,
                            "VIVO":1654,
                            "OPPO":1467,
                            "XiaoMi":2313,
                            "HuaWei":7890,
                        },
                        {
                            "Apple":5463,
                            "OnePlus":6834,
                            "SamSung":5434,
                            "VIVO":3233,
                            "OPPO":1157,
                            "XiaoMi":2344,
                            "HuaWei":2340,
                        },
                        {
                            "Apple":8458,
                            "OnePlus":3567,
                            "SamSung":3134,
                            "VIVO":4584,
                            "OPPO":3452,
                            "XiaoMi":11257,
                            "HuaWei":1233,
                        },                    
                        {
                            "Apple":1241,
                            "OnePlus":6852,
                            "SamSung":3463,
                            "VIVO":3434,
                            "OPPO":1876,
                            "XiaoMi":2131,
                            "HuaWei":8556,
                        },                    
                        {
                            "Apple":3123,
                            "OnePlus":3155,
                            "SamSung":1344,
                            "VIVO":1112,
                            "OPPO":3144,
                            "XiaoMi":5667,
                            "HuaWei":12313,
                        },                    
                        {
                            "Apple":12312,
                            "OnePlus":3665,
                            "SamSung":8231,
                            "VIVO":3434,
                            "OPPO":7867,
                            "XiaoMi":2123,
                            "HuaWei":5490,
                        },                    
                        {
                            "Apple":3218,
                            "OnePlus":1234,
                            "SamSung":6424,
                            "VIVO":1244,
                            "OPPO":1127,
                            "XiaoMi":7813,
                            "HuaWei":7890,
                        },                    
                    ] as GoodsType[]
                },
                videoData:[
                    { name:"Apple", value:14999 },
                    { name:"OnePlus", value:1999 },
                    { name:"SamSung", value:8999 },
                    { name:"VIVO", value:3999 },
                    { name:"OPPO", value:6999 },
                    { name:"XiaoMi", value:4999 },
                    { name:"HuaWei", value:24999 },
                ] as VideoType[],
                userData:[
                    { date:"周一", new:5, active:200 },
                    { date:"周二", new:15, active:700 },
                    { date:"周三", new:25, active:800 },
                    { date:"周四", new:55, active:300 },
                    { date:"周五", new:35, active:500 },
                    { date:"周六", new:5, active:100 },
                    { date:"周日", new:45, active:200 },
                ] as UserDataType[],
            }
        }
    },
}
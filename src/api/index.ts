import Mock from "mockjs";
import homeApi from "./home/home";
import uesrtableApi from "./home/user"
import permissionApi from "./home/permission"
//1.拦截路径 2.请求方式 3.返回数据
Mock.mock(/api\/home\/getTableData/, 'get',homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, 'get',homeApi.getCountData);
Mock.mock(/api\/home\/getEchartsData/, 'get',homeApi.getEchartsData);
Mock.mock(/api\/home\/getUserTableData/, 'get',uesrtableApi.getUserTableData);
Mock.mock(/api\/home\/deleteUser/, 'get',uesrtableApi.deleteUser);
Mock.mock(/api\/home\/addUser/, 'post',uesrtableApi.addUser);
Mock.mock(/api\/home\/updateUser/, 'post',uesrtableApi.updateUser);
Mock.mock(/api\/home\/getMenu/, 'post',permissionApi.getMenu);
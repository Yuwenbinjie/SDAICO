import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import ProjectManage from '../views/ProjectManage.vue'
import StreamInfo from '../views/StreamInfo.vue'
import CancelInfo from '../views/CancelInfo.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        display: '主页',
        component: Home,
    },
    {
        path: '/project',
        name: 'ProjectManage',
        display: '项目管理',
        component: ProjectManage,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        display: '仪表盘',
        component: Dashboard,
    },
    {
        path: '/streamInfo',
        name: 'StreamInfo',
        display: '流信息',
        component: StreamInfo,
    },
    {
        path: '/cancelInfo',
        name: 'CancelInfo',
        display: '已取消',
        component: CancelInfo,
    },
]

const router = new VueRouter({
    routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入
import login from '../view/login'
import home from '../view/home'
import delicious from '../view/delicious'
import health from '../view/health'
import project from '../view/project'
import community from '../view/community'
import ingredients from '../view/ingredients'
import information from '../view/information'

//   注册/使用
Vue.use(VueRouter)

// 配置路由
const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/home',
        name: 'home',
        component: home,
    },
    {
        path: '/delicious',
        name: 'delicious',
        component: delicious,
    },
    {
        path: '/health',
        name: 'health',
        component: health,
    },
    {
        path: '/project',
        name: 'project',
        component: project,
    },
    {
        path: '/community',
        name: 'community',
        component: community,
    },
    {
        path: '/ingredients',
        name: 'ingredients',
        component: ingredients,
    },
    {
        path: '/information',
        name: 'information',
        component: information,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    // 控制跳转后在顶部
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})

// 路由拦截
router.beforeEach((to, from, next) => {
    if (to.path === '/') return next()
    if (!sessionStorage.getItem('user')) return next('/')
    next()
})

export default router

// 解决跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
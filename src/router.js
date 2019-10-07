import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'

/* 注册路由插件 */
Vue.use(Router)
/*创建路由对象 */
export default new Router({
  /* 路由的配置 */
  routes: [
    /* 登录页 */
    {
      path: "/Login",
      component: Login
    },
    /* 后台首页 */
    {
      path: "/",
      component: Index,
      children: [

      ]
    },
  ]
})
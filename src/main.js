import Vue from 'vue'
//引入axios
import axios from 'axios'
//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from 'element-ui';
import App from './App.vue'
import router from './router'
//解构引入组件


import "@/styles/common.less"

Vue.use(ElementUI);

Vue.prototype.axios = axios;

//全局路由守卫 拦截所有路由
router.beforeEach((to,from,next) => {
  //获取token
  const token = window.localStorage.getItem('token');
  //判断token是否存在
  if(token){
    //直接放行
    next();
  }else{
    //判断是不是去login页
    if(to.path === '/login'){
      //如果是直接放行
      next();
    }else{
      //弹出提示
      Message.error('请登录以后再做其他操作！');
      //如果不是登录页 跳转到登录页
      return next({"path":"/login"})
    }
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

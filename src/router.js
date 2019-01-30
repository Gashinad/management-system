import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=>import("./views/Login/Login.vue")
    },
    {
      path:'/',
      name:'index',
      component:()=>import("./views/Index/Index.vue"),
      children:[
        {
          path:'',
          name:'home',
          component:()=>import('./views/Home/Home.vue')
        },
        {
          path:'/accountmanage',
          name:'accountmanage',
          component:()=>import('./views/AccountManage/AccountManage.vue')
        },
        {
          path:'/accountadd',
          name:'accountadd',
          component:()=>import('./views/AccountAdd/AccountAdd.vue')
        },
        {
          path:'/passwordedit',
          name:'passwordedit',
          component:()=>import('./views/PasswordEdit/PasswordEdit.vue')
        },
        {
          path:'/productmanage',
          name:'productmanage',
          component:()=>import('./views/ProductManage/ProductManage.vue')
        },
        {
          path:'/productadd',
          name:'productadd',
          component:()=>import('./views/ProductAdd/ProductAdd.vue')
        },
        {
          path:'/inventorymanage',
          name:'inventorymanage',
          component:()=>import('./views/InventoryManage/InventoryManage.vue')
        },
        {
          path:'/inventoryadd',
          name:'inventoryadd',
          component:()=>import('./views/InventoryAdd/InventoryAdd.vue')
        },
        {
          path:'/saleslist',
          name:'saleslist',
          component:()=>import('./views/SalesList/SalesList.vue')
        },
        {
          path:'/outboundgoods',
          name:'outboundgoods',
          component:()=>import('./views/OutboundGoods/OutboundGoods.vue')
        },
        {
          path:'/goodsreturn',
          name:'goodsreturn',
          component:()=>import('./views/GoodsReturn/GoodsReturn.vue')
        },
      ]
    }
  ]
})

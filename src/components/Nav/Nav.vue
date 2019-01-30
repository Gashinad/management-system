<template>
    <el-menu
        :default-active="this.$route.path"
        unique-opened
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="rgb(64, 158, 255)"
        router
        >
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i><span>系统管理</span></template>
            <el-menu-item-group>
                <el-menu-item index="/">系统信息</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i><span>账号管理</span></template>
            <el-menu-item-group>
                <el-menu-item index="/accountmanage">账号管理</el-menu-item>
                <el-menu-item index="/accountadd">添加账号</el-menu-item>
                <el-menu-item index="/passwordedit">密码修改</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
            <template slot="title"><i class="el-icon-goods"></i><span>商品管理</span></template>
            <el-menu-item-group>
                <el-menu-item index="/productmanage">商品管理</el-menu-item>
                <el-menu-item index="/productadd">添加商品</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
            <template slot="title"><i class="el-icon-bell"></i><span>进货管理</span></template>
            <el-menu-item-group>
                <el-menu-item index="/inventorymanage">库存管理</el-menu-item>
                <el-menu-item index="/inventoryadd">添加库存</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
            <template slot="title"><i class="el-icon-service"></i><span>出货管理</span></template>
            <el-menu-item-group>
                <el-menu-item index="/saleslist">销售列表</el-menu-item>
                <el-menu-item index="/outboundgoods">商品出库</el-menu-item>
                <el-menu-item index="/goodsreturn">商品退货</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {};
</script>
<style lang="less">
      .el-menu {
        border: none;
        .el-submenu {
          .el-menu {
            .el-menu-item-group {
              .el-menu-item-group__title {
                padding: 0;
              }
            }
          }
        }
      }
</style>



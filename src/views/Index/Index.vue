<template>
    <div class="index">
        <el-container>
            <!-- 左侧导航栏 -->
            <el-aside width="200px">
                <Nav></Nav>
            </el-aside>
            <!-- 右侧内容页 -->
            <el-container>
                <el-header>
                    <h1><i class="el-icon-menu">华联超市管理系统</i></h1>
                </el-header>
                <!-- 右侧中间 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
                <!-- 右侧尾部 -->
                <el-footer>
                    &copy; CopyRight 2018 华联超市管理系统
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Nav from "@/components/Nav/Nav.vue"
export default {
    components:{
        Nav
    }
};
</script>

<style lang="less">
.index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header,
    .el-footer {
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }

    .el-aside {
      background-color: #2d3a4b;
      color: #333;
      text-align: center;
    }
    .el-container{
        .el-header > h1{
            text-indent: 30px;
            text-align: left;
            margin: 0;
        }
        .el-footer{
            margin: 0;
            text-indent: 30px;
            text-align: left;
        }
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
    }
  }
}
</style>

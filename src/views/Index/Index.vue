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
                    <Top></Top>
                </el-header>
                <!-- 右侧中间 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
                <!-- 右侧尾部 -->
                <el-footer>
                    <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Nav from "@/components/Nav/Nav.vue"
import Top from "@/components/Top/Top.vue"
import Bottom from "@/components/Bottom/Bottom.vue"
export default {
    components:{
        Nav,
        Top,
        Bottom
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
        .el-header > .top > h1{
            // text-indent: 30px;
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

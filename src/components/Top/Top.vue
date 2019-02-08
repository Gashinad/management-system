<template>
    <div class="top">
        <el-header>
            <h1 class="title">
                <i class="el-icon-menu"></i>                
                华联超市管理系统
            </h1>
            <!-- 当前登录用户名 -->
            <div class="username">
                <!-- 下拉框 -->
                <el-dropdown trigger="click"  @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }} <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="avatar">
                    <img style="border-radius: 50%;" width="50px" height="50px" src="./avatar.jpg" alt="">
                </div>
            </div>
        </el-header>
    </div>
</template>
<script>
export default {
  data() {
    return {
      username: "admin"
    };
  },
  methods: {
    // 点击下拉框选项 触发函数
    handleCommand(command) {}
  },
};
</script>
<style lang="less">
.top {
  // 头
  .el-header {
    position: relative;
    height: 60px;
    line-height: 60px;
    background-color: #ffffff;
    text-align: right;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .title {
      margin: 0;
      position: absolute;
      height: 60px;
      line-height: 60px;
    }
    .username {
      vertical-align: top;
      display: inline-block;
      height: 60px;
      line-height: 60px;
      margin-right: 20px;
      margin-left: 1450px;
      .avatar {
        vertical-align: top;
        display: inline-block;
        margin-top: 5px;
        margin-left: 10px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        text-align: center;
      }
    }
  }
}
</style>



<template>
    <div class="passwordedit">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
            <div class="text item">
                <div class="login-wrapper">
                    <el-form :model="passEdit" status-icon :rules="rules" ref="passEdit" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原密码" prop="password">
                            <el-input type="text" v-model="passEdit.password" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="新密码" prop="newPassword">
                            <el-input type="text" v-model="passEdit.newPassword" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="确认新密码" prop="checkNewPwd">
                            <el-input type="text" v-model="passEdit.checkNewPwd" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('passEdit')">修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    const checkPass = (rule, value, callback) => {
        if(value === ""){
            callback(new Error("请输入原密码"))
        }else if(value.length < 3 || value.length > 6){
            callback(new Error("密码长度在3-6位"))
        }else{
            callback();
        }
    };
    const checkNewPass = (rule, value, callback) => {
        if(value === this.passEdit.password){
            callback(new Error("不能与原密码一致"))
        }else if(value.length < 3 || value.length > 6){
            callback(new Error("密码长度在3-6位"))
        }else{
            if(this.passEdit.checkNewPwd !== ""){
                this.$refs.passEdit.validateField("checkNewPwd")
            }
            callback();
        }
    };
    const checkNewPass2 = (rule, value, callback) => {
        if(value === ""){
            callback(new Error("请再次输入新密码"))
        }else if(value !== this.passEdit.newPassword){
            callback(new Error("两次新密码输入不一致"))
        }else{
            callback();
        }
    };
    return {
      passEdit: {
        password: "",
        newPassword: "",
        checkNewPwd: ""
      },
      rules: {
        password: [{ required: true, validator: checkPass, trigger: "blur" }],
        newPassword: [
          { required: true, validator: checkNewPass, trigger: "blur" }
        ],
        checkNewPwd: [
          { required: true, validator: checkNewPass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("前端验证成功！可以发送数据给后端");
          //跳转到后端首页
          //   this.$router.push("/");
        } else {
          alert("前端验证失败！不能发送数据给后端");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.passwordedit {
  .el-card {
    border-radius: 8px;
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 800;
      background-color: #ccc;
    }
    .text {
      .login-wrapper {
        width: 500px;
        height: 350px;
        padding: 20px 0 10px 0px;
        .el-form {
          padding: 20px 70px 10px 0px;
          .el-form-item {
            .el-form-item__content {
              .el-select {
                display: block;
                width: 190px;
              }
              .el-button {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>



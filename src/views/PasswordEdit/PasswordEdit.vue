<template>
    <div class="passwordedit">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
            <div class="text item">
                <div class="login-wrapper">
                    <el-form :model="passEdit" status-icon :rules="rules" ref="passEdit" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原密码" prop="oldPassword">
                            <el-input type="text" v-model="passEdit.oldPassword" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="新密码" prop="newPassword">
                            <el-input type="text" v-model="passEdit.newPassword" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="确认新密码" prop="checkNewPwd">
                            <el-input type="text" v-model="passEdit.checkNewPwd" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('passEdit')">确认修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import qs from 'qs';
export default {
  data() {
    const checkOldPass = (rule, value, callback) => {
        //获取当前登录账户的用户名
        let username = window.localStorage.getItem("username");

        //发送ajax请求 把登录账户的用户名与原密码发送后端查找
        this.axios.get(`http://127.0.0.1:666/account/checkOldPwd?oldPwd=${value}&username=${username}`)
        .then(response=>{
            //接收后端返回的数据对象
            let {error_code,reason} = response.data;
            //判断
            if(error_code === 0){
                //正确的回调
                callback();
            }else{
                // 错误提示信息
                callback(new Error(reason))
            }
        })
        .catch(err=>{
            console.log(err);
        })
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
        oldPassword: "",
        newPassword: "",
        checkNewPwd: ""
      },
      rules: {
        oldPassword: [
          { required: true, validator: checkOldPass, trigger: "blur" }
        ],
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
          //收集数据
          let params = {
              username:window.localStorage.getItem("username"),
              newPassword:this.passEdit.newPassword,
              oldPassword:this.passEdit.oldPassword
          }

          //发送ajax请求
          this.axios.post('http://127.0.0.1:666/account/savenewpwd',qs.stringify(params))
            .then(response=>{
                console.log(response.data)
                //接收前端返回的数据
                let {error_code,reason} = response.data;
                //判断
                if(error_code === 0){
                    // 清除token
                    window.localStorage.removeItem("token");

                    //成功的提示信息
                    this.$message({
                        type:"success",
                        message:reason
                    })
                    //跳转到登录页
                    this.$router.push('/login')
                }else{
                    //失败的提示信息
                    this.$message.error(reason);
                }
            })
            .catch(err=>{
                console.log(err)
            })
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



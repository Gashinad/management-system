<template>
    <div class="account-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
            <div class="text item">
                <div class="add-wrapper">
                    <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input type="text" v-model="addForm.username" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input type="text" v-model="addForm.password" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="确认密码" prop="checkPwd">
                            <el-input type="text" v-model="addForm.checkPwd" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="选择用户组" prop="usergroup">
                            <el-select v-model="addForm.usergroup" placeholder="请选择用户组">
                            <el-option label="普通用户" value="普通用户"></el-option>
                            <el-option label="高级管理员" value="高级管理员"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('addForm')">添加</el-button>
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
    //验证密码的函数
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("密码长度为3 - 6位"));
      } else {
        if (this.addForm.checkPwd !== "") {
          this.$refs.addForm.validateField("checkPwd");
        }
        callback();
      }
    };
    //验证确认密码的函数
    const checkPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      addForm: {
        username: "",
        password: "",
        checkPwd: "",
        usergroup:""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "账号长度在3 - 5位", trigger: "blur" }
        ],
        password: [{ required: true, validator: checkPass, trigger: "blur" }],
        checkPwd: [{ required: true, validator: checkPass2, trigger: "blur" }],
        usergroup:[{ required: true, message:"请选择用户组", trigger:"change"}]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集用户输入的所有账号数据
          let params ={
            username:this.addForm.username,
            password:this.addForm.password,
            usergroup:this.addForm.usergroup
          };


          this.axios.post('http://127.0.0.1:666/account/accountadd',qs.stringify(params))
          .then(response => {
            let {error_code,reason}=response.data;
            //根据后端响应的数据判断
            if(error_code === 0){
              this.$message({
                type:'success',
                message:reason
              })
              //跳转到账号管理页面
              this.$router.push('/accountmanage');
            }else{
              this.$message.error(reason)
            }
          })
          .catch(err => {
            console.log(err);
          })

        } else {
          //前端验证失败
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.account-add {
  .el-card {
    border-radius: 8px;
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 800;
      background-color: #ccc;
    }
    .text {
      .add-wrapper {
        width: 500px;
        height: 350px;
        padding: 20px 0 10px 0px;
        .el-form {
            padding: 20px 70px 10px 0px;
          .el-form-item{
              .el-form-item__content{
                  .el-select{
                      display: block;
                      width: 190px;
                  }
                  .el-button{
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


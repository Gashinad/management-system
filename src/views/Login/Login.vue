<template>
    <div class="login">
        <div class="login-wrapper">
            <h1 class="title"><i class="el-icon-menu">华联超市管理系统</i></h1>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="text" v-model="loginForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>

<script>
// import "@/styles/common.less"
import qs from 'qs';
export default {
    data() {
      //验证密码的函数
      const checkPass = (rule,value,callback) =>{
        if(value === ""){
          callback(new Error("请输入密码"))
        }else if(value.length < 3 || value.length > 6){
          callback(new Error("密码长度为3 - 6位"))
        }else{
          if(this.loginForm.checkPwd !== ""){
            this.$refs.loginForm.validateField("checkPwd")
          }
          callback()
        }
      }
      //验证确认密码的函数
      const checkPass2 = (rule,value,callback)=>{
        if(value === ""){
          callback(new Error("请再次输入密码"))
        }else if(value !== this.loginForm.password){
          callback(new Error("两次输入密码不一致"))
        }else{
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: '',
          checkPwd: ''
        },
        rules: {
          username: [
            { required:true,message:"请输入账号", trigger: 'blur' },
            {min:3,max:5,message:"账号长度在3 - 5位",trigger:'blur'}
          ],
          password: [
            { required:true,validator:checkPass, trigger: 'blur' }
          ],
          checkPwd: [
            { required:true,validator:checkPass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //收集账号和密码
            let params = {
              username:this.loginForm.username,
              password:this.loginForm.password
            };
            //发送ajax到后台
            this.axios.post('http://127.0.0.1:666/login/checklogin',qs.stringify(params))
              .then(response=>{
                //接收后端返回的数据
                let {error_code,reason,token,username} = response.data;
                //判断
                if(error_code === 0){
                  //将token存入浏览器的本地存储中
                  window.localStorage.setItem('token',token);
                  //把用户名存入本地存储中
                  window.localStorage.setItem('username',username);

                  //成功的提示信息
                  this.$message({
                    type:'success',
                    message:reason
                  });
                  //跳转到后端首页
                  this.$router.push('/');
                }else{
                  //失败的提示信息
                  this.$message.error(reason);
                }
              })
              .catch(err=>{
                console.log(err)
              })

          } else {
            alert('前端验证失败！不能发送数据给后端');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>


<style lang="less">
.login {
  height: 100%;
  width: 100%;
  background: #2d3a4b;
  .login-wrapper{
      width: 500px;
      height: 350px;
      padding: 20px 0 10px 0px;
      background: rgba(0,0,0,0.2);
       position: fixed;
       top:0;
       right: 0;
       left: 0;
       bottom: 0;
       margin: auto;
       .title{
           color: #fff;
           font-size: 24px;
           margin-left: 55px;
       }
       .el-form{
         padding: 20px 70px 10px 0px;
       }
  }
}
</style>


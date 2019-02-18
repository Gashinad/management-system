<template>
    <div class="productadd">
                <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>
            <div class="text item">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <!-- 所属分类 -->
                    <el-form-item label="所属分类" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择分类">
                        <el-option label="海飞丝" value="海飞丝"></el-option>
                        <el-option label="茅台" value="茅台"></el-option>
                        <el-option label="优乐美" value="优乐美"></el-option>
                        <el-option label="龙凤呈祥" value="龙凤呈祥"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 商品条形码 -->
                    <el-form-item label="商品条形码" prop="productNum">
                        <el-input v-model="ruleForm.productNum"></el-input>
                        <el-button type="success" @click="randomNum()">生成条形码</el-button>
                    </el-form-item>
                    <!-- 商品名称 -->
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <!-- 商品售价 -->
                    <el-form-item label="商品售价" prop="salePrice">
                        <el-input v-model="ruleForm.salePrice"></el-input><span>元</span>
                    </el-form-item>
                    <!-- 市场价 -->
                    <el-form-item label="市场价" prop="scPrice">
                        <el-input v-model="ruleForm.scPrice"></el-input><span>元</span>
                        <p>默认市场价为售价的1.2倍</p>
                    </el-form-item>
                    <!-- 商品进价 -->
                    <el-form-item label="商品进价" prop="prchasePrice">
                        <el-input v-model="ruleForm.prchasePrice"></el-input><span>元</span>
                    </el-form-item>
                    <!-- 入库数量 -->
                    <el-form-item label="入库数量" prop="inventory">
                        <el-input v-model="ruleForm.inventory"></el-input><br>
                        <p>记量商品单位为千克</p>
                    </el-form-item>
                    <!-- 商品重量 -->
                    <el-form-item label="商品重量" prop="productWeight">
                        <el-input v-model="ruleForm.productWeight"></el-input>
                    </el-form-item>
                    <!-- 商品单位 -->
                    <el-form-item label="商品单位" prop="productUnit">
                        <el-input v-model="ruleForm.productUnit"></el-input>
                    </el-form-item>
                    <!-- 会员优惠 -->
                    <el-form-item label="会员优惠">
                        <el-radio-group v-model="ruleForm.vip">
                          <el-radio label="享受"></el-radio>
                          <el-radio label="不享受"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 是否促销 -->
                    <el-form-item label="是否促销">
                        <el-radio-group v-model="ruleForm.resource">
                          <el-radio label="启用"></el-radio>
                          <el-radio label="禁用"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 商品简介 -->
                    <el-form-item label="商品简介" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input><br>
                        <p>不超过200个汉字</p>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>


    </div>
</template>
<script>
import qs from 'qs';
export default {
  data() {
    //验证是否是数字
    const checkNum = (rule, value, callback) => {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (!reg.test(value)) {
        callback(new Error("价格必须是数字"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        region: "",
        desc: "",
        productNum: "",
        salePrice: "",
        scPrice: "",
        prchasePrice: "",
        inventory: 0,
        productWeight: "",
        productUnit: "",
        resource:"",
        vip:""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写商品简介", trigger: "blur" },
          { min: 0, max: 200, message:'不能超过200个汉字',trigger:'change'}
        ],
        productNum: [
          { required: true, message: "请生成条形码", trigger: "change" }
        ],
        salePrice: [{ required: true, validator: checkNum, trigger: "change" }],
        scPrice: [{ validator: checkNum, trigger: "change" }],
        prchasePrice: [{ validator: checkNum, trigger: "change" }],
        storageNum: [{ validator: checkNum, trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //要发送的数据
          let params = {
            productNum:this.ruleForm.productNum,
            name:this.ruleForm.name,
            region:this.ruleForm.region,
            salePrice:this.ruleForm.salePrice,
            cxPrice:this.ruleForm.prchasePrice,
            scPrice:this.ruleForm.scPrice,
            inventory:this.ruleForm.inventory,
            allMoney:this.ruleForm.prchasePrice * this.ruleForm.inventory,
            saleMoney:this.ruleForm.salePrice * 40
          }
          console.log(params)
          this.axios.post('http://127.0.0.1:666/product/productadd',qs.stringify(params))
          .then(response=>{
            //接收后端返回的数据对象
            let {error_code, reason} = response.data;
            //判断
            if(error_code === 0){
              this.$message({
                type:'success',
                message:reason
              });
              //跳转到商品管理页面
              this.$router.push('/productmanage')
            }else{
              this.$message.error(reason)
            }
          })
          .catch(err=>{
            console.log(err)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    randomNum() {
      let str = '6222626'+ Math.random()
        .toString()
        .substr(2, 6);
      this.ruleForm.productNum = str;
    }
  }
};
</script>


<style lang="less">
.productadd {
  .el-card {
    border-radius: 8px;
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 800;
      background-color: #ccc;
    }
  }
  .el-form {
    width: 800px;
    .el-form-item {
      .el-form-item__content {
        text-align: left;
        .el-select {
          display: block;
        }
        .el-input {
          display: block;
          width: 400px;
          float: left;
        }
        p{
            margin: 0;
            color: #ccc;
        }
        .el-button {
          float: left;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>



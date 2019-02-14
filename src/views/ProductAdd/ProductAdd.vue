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
                        <el-option label="分类一" value="海飞丝"></el-option>
                        <el-option label="分类二" value="五粮液"></el-option>
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
                    <el-form-item label="商品售价" prop="price">
                        <el-input v-model="ruleForm.price"></el-input><span>元</span>
                    </el-form-item>
                    <!-- 市场价 -->
                    <el-form-item label="市场价" prop="marketPrice">
                        <el-input v-model="ruleForm.marketPrice"></el-input><span>元</span>
                        <p>默认市场价为售价的1.2倍</p>
                    </el-form-item>
                    <!-- 商品进价 -->
                    <el-form-item label="商品进价" prop="prchasePrice">
                        <el-input v-model="ruleForm.prchasePrice"></el-input><span>元</span>
                    </el-form-item>
                    <!-- 入库数量 -->
                    <el-form-item label="入库数量" prop="storageNum">
                        <el-input v-model="ruleForm.storageNum"></el-input><br>
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
                        <el-radio-group v-model="ruleForm.resource">
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
        price: "",
        marketPrice: "",
        prchasePrice: "",
        storageNum: "",
        productWeight: "",
        productUnit: "",
        resource:""
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
        price: [{ required: true, validator: checkNum, trigger: "change" }],
        marketPrice: [{ validator: checkNum, trigger: "change" }],
        prchasePrice: [{ validator: checkNum, trigger: "change" }],
        storageNum: [{ validator: checkNum, trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("添加成功!可以发送数据给后端");
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
      let str = Math.random()
        .toString()
        .substr(2, 13);
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



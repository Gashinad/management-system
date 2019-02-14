<template>
    <div class="product-manage">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品管理</span>
        </div>
        <div class="text item">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="所属分类">
                <el-select v-model="searchForm.cateName" placeholder="所属分类">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="酒水类" value="酒水类"></el-option>
                    <el-option label="水果类" value="水果类"></el-option>
                    <el-option label="电子类" value="电子类"></el-option>
                    <el-option label="食品类" value="食品类"></el-option>
                    <el-option label="生活用品" value="生活用品"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字">
                <el-input v-model="searchForm.keyWord" placeholder="商品名称或条形码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>

          <hr>

            <el-table
              :data="tableData2"
              style="width: 100%"
              :row-class-name="tableRowClassName">
              <el-table-column
                prop="productNum"
                label="商品条形码"
                width="130">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名称"
                width="135">
              </el-table-column>
              <el-table-column
                prop="productLei"
                label="所属分类">
              </el-table-column>
              <el-table-column
                prop="salePrice"
                label="售价(元)">
              </el-table-column>
              <el-table-column
                prop="cxPrice"
                label="促销价(元)">
              </el-table-column>
              <el-table-column
                prop="scPrice"
                label="市场价(元)">
              </el-table-column>
              <el-table-column
                prop="kucun"
                label="库存(元)">
              </el-table-column>
              <el-table-column
                prop="allMoney"
                label="库存总额(元)">
              </el-table-column>
              <el-table-column
                prop="saleMoney"
                label="销售总额(元)">
              </el-table-column>
              <el-table-column
                prop="confuse"
                label="管理"
                width="120">
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
              </el-table-column>
            </el-table>

            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="1000">
              </el-pagination>
            </div>
        </div>
      </el-card>
    </div>
</template>
<script>
// 引入头部组件 和 尾部组件
import Top from "@/components/Top/Top.vue";
import Bottom from "@/components/Bottom/Bottom.vue";

// 暴露出去 暴露的是当前组件的vue实例对象（new Vue({  })）
export default {
  // 注册组件
  components: {
    Top,
    Bottom
  },
  // 数据
  data() {
    return {
      searchForm: {
        cateName: "",
        keyWord: ""
      },
      tableData2: [
        {
          productNum: "6222626595445",
          name: "海飞丝去屑洗发水",
          productLei: "海飞丝",
          salePrice: "10.00",
          cxPrice: "8.00",
          scPrice: "12.00",
          kucun: "0(缺)",
          allMoney: "0",
          saleMoney: "280.00"
        },
        {
          productNum: "6222626595445",
          name: "我的优乐美",
          productLei: "优乐美",
          salePrice: "4.00",
          cxPrice: "3.00",
          scPrice: "5.00",
          kucun: "10",
          allMoney: "40.00",
          saleMoney: "560.00"
        },
        {
          productNum: "6222626595445",
          name: "茅台酒",
          productLei: "茅台",
          salePrice: "1000.00",
          cxPrice: "800.00",
          scPrice: "1200.00",
          kucun: "8",
          allMoney: "8000.00",
          saleMoney: "12000.00"
        },
        {
          productNum: "6222626595445",
          name: "龙凤呈祥2",
          productLei: "龙凤呈祥",
          salePrice: "15.00",
          cxPrice: "12.00",
          scPrice: "18.00",
          kucun: "20",
          allMoney: "300.00",
          saleMoney: "780.00"
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less">
.product-manage {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .text {
        .el-form {
          text-align: left;
        }
        .el-pagination {
          margin-top: 20px;
          text-align: left;
          font-size: 16px;
        }
      }
    }
  }
}
</style>






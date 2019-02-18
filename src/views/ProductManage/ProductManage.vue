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
              ref="multipleTable"
              :data="tableData2"
              tooltip-effect="dark"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              @selection-change="handleSelectionChange"
              >
              <!-- 单选框 -->
              <el-table-column
              type="selection"
              width="40">
              </el-table-column>

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
                prop="region"
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
                prop="scprice"
                label="市场价(元)">
              </el-table-column>
              <el-table-column
                prop="inventory"
                label="库存">
              </el-table-column>
              <el-table-column
                prop="allMoney"
                label="库存总额(元)">
              </el-table-column>
              <el-table-column
                prop="saleMoney"
                label="销售总额(元)">
              </el-table-column>
              <!-- 操作 -->
              <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                      <el-button
                      type="primary"
                      size="mini"
                      @click="handleEdit(scope.row.id)">
                          <i class="el-icon-edit"></i> 编辑
                      </el-button>
                      <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.row.id)">
                          <i class="el-icon-delete"></i>  删除
                      </el-button>
                  </template>
              </el-table-column>
            </el-table>

            <div style="margin-top: 20px; text-align: left;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 3, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>

            <!-- 批量删除按钮 & 取消选择按钮 -->
            <div style="margin-top: 20px; text-align: left;">
              <el-button @click="batchDelete">批量删除</el-button>
              <el-button @click="cancelSelect()">取消选择</el-button>
            </div>
            <!-- 修改数据模态框 -->
            <el-dialog title="账号管理" width="500px" :visible.sync="flag">
              <el-form :model="editForm" label-width="60px">
                <el-form-item label="用户名" prop="username">
                  <el-input style="width:280px;" type="text" v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="用户组" prop="region">
                  <el-select style="width:280px;" v-model="editForm.region" placeholder="请选择用户组">
                    <el-option label="海飞丝" value="海飞丝"></el-option>
                    <el-option label="优乐美" value="优乐美"></el-option>
                    <el-option label="茅台" value="茅台"></el-option>
                    <el-option label="龙凤呈祥" value="龙凤呈祥"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
              </div>
            </el-dialog>
        </div>
      </el-card>
    </div>
</template>
<script>
// 引入头部组件 和 尾部组件
import Top from "@/components/Top/Top.vue";
import Bottom from "@/components/Bottom/Bottom.vue";
import qs from 'qs';

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
      tableData2: [],
      flag:false,
      editForm:{
        name:"",
        region:""
      },
      editId:"",
      selectionProduct:[],
      currentPage:1,
      total:0,
      pageSize:3
    };
  },
  //生命周期
  created(){
      //调用商品列表数据
      this.getProductListBypage();
    },
  methods: {
    // //获取所有商品列表数据
    // getProductList(){
    //   //发送请求查询所有数据
    //   this.axios.get('http://127.0.0.1:666/product/productlist')
    //   .then(response=>{
    //     this.tableData2 = response.data;
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
    // },

    //通过分页获取所有商品数据
    getProductListBypage(){
      //传入当前页和每页显示条数
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      //发送axios请求
      this.axios.get('http://127.0.0.1:666/product/productlistbypage',{
        params:{
          pageSize,
          currentPage
        }
      })
      .then(response=>{
        //接收后端返回的数据
        let {total ,data} = response.data;
        this.total = total;
        this.tableData2 = data;
        //判断是否有data
        if(!data.length && this.currentPage !== 1){
          this.currentPage = this.currentPage - 1;
          //在调用自己
          this.getProductListBypage();
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getProductListBypage();      
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProductListBypage();
    },
    handleSelectionChange(val){
      this.selectionProduct = val;
    },
    handleDelete(id){
      this.$confirm('你确定要删除吗？','提示',{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(()=>{
        this.axios.get(`http://127.0.0.1:666/product/productdel?id=${id}`)
        .then(response=>{
          //接收后端返回的数据对象
          let {error_code,reason} = response.data;
          //判断是成功还是失败
          if(error_code === 0){
            this.$message({
              type:'success',
              message:reason
            })
            //刷新列表
            this.getProductListBypage();
          }else{
            this.$message.error(reason)
          }
        })
        .catch(err=>{
          console.log(err)
        })
      })
      .catch(()=>{
        this.$message({
          type:"info",
          message:"已取消删除"
        })
      })
    },
    //修改商品数据 回填数据
    handleEdit(id){
      // 保存原来的id
      this.editId = id;
      //弹出模态框
      this.flag = true;
      //发送请求跟后台
      this.axios.get(`http://127.0.0.1:666/product/productedit?id=${id}`)
      .then(response=>{
        //接收后端返回的数据
        let data = response.data[0];
        this.editForm.name = data.name;
        this.editForm.region = data.region;
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //保存修改后的数据
    saveEdit(){
      //定义变量保存要发送的数据
      let params = {
        name:this.editForm.name,
        region:this.editForm.region,
        editId:this.editId
      }

      //修改后的数据跟 原来的id发送给后端
      this.axios.post('http://127.0.0.1:666/product/saveproductedit',qs.stringify(params))
      .then(response=>{
        // 接收后端返回的数据
        let {error_code,reason} = response.data;
        //判断
        if(error_code === 0){
          this.$message({
            type:'success',
            message:reason
          })
          //关闭模态框
          this.flag = false;
          //刷新列表
          this.getProductListBypage();
        }else{
          this.$message.error(reason)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //取消选择
    cancelSelect(){
      this.$refs.multipleTable.clearSelection();      
    },
    //批量删除
    batchDelete(){
      //获取所有被选中的商品数据的id
      let selectionId = this.selectionProduct.map(v => v.id);


      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(()=>{
          //发送axios请求 把要被删除的id发送给后端
          this.axios.get('http://127.0.0.1:666/product/batchdelete',{
            params:{
              selectionId
            }
          })
          .then(response=>{
            let {error_code,reason} = response.data;
            //判断
            if(error_code === 0){
              this.$message({
                type:'success',
                message:reason
              });
              //刷新列表
              this.getProductListBypage();
            }else{
              this.$message.error(reason)
            }
          })
          .catch(err=>{
            console.log(err)
          })
        })
        .catch(()=>{
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
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






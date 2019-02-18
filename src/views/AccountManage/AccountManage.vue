<template>
    <div class="account-manage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <div class="text item">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <!-- 单选框 -->
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    
                    <!-- 账号 -->
                    <el-table-column
                    prop="username"
                    label="账号"
                    >
                    </el-table-column>

                    <!-- 用户组 -->
                    <el-table-column
                    prop="usergroup"
                    label="用户组"
                    >
                    </el-table-column>

                    <!-- 日期 -->
                    <el-table-column
                    label="创建日期"
                    >
                    <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
                    </el-table-column>

                    <!-- 操作 -->
                    <el-table-column label="操作">
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
                 <!-- 分页 -->
                <div style="margin-top: 20px; text-align: left;">
                   <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[1, 3, 5, 10, 20, 50]"
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
                      <el-input style="width:280px;" type="text" v-model="editForm.username" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="用户组" prop="usergroup">
                      <el-select style="width:280px;" v-model="editForm.usergroup" placeholder="请选择用户组">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="高级管理员" value="高级管理员"></el-option>
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
import moment from "moment";
import qs from 'qs';
export default {
  data() {
    return {
      tableData: [],
      editForm:{
        username:'',
        usergroup:''
      },
      flag:false,
      editId:'',
      selectionAccount:[],
      currentPage:1,
      pageSize:3,
      total:10,
    };
  },
  //生命周期的钩子函数 自动触发 vue组件实例对象创建完成 dom还未绑定 这个函数中发送axios请求 获取数据
  created() {
    this.getAccountListBypage();
  },
  methods: {
    // getAccountList() {
    //   this.axios
    //     .get("http://127.0.0.1:666/account/accountlist")
    //     .then(response => {
    //       //把后端返回的账号数据 赋值给用户账号表格数据tabledata
    //       this.tableData = response.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    //根据分页显示数据的函数
    getAccountListBypage(){
      //传入当前页和每页显示条数
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      //发送axios请求
      this.axios.get('http://127.0.0.1:666/account/accountlistbypage',{
        params:{
          pageSize,
          currentPage
        }
      })
      .then(response=>{
        //接收后端返回的数据
        let {total ,data} = response.data;
        this.total = total;
        this.tableData = data;
        //判断是否有data
        if(!data.length && this.currentPage !== 1){
          this.currentPage = this.currentPage - 1;
          //在调用自己
          this.getAccountListBypage();
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //每页显示条数改变
    handleSizeChange(val){
      this.pageSize = val;
      this.getAccountListBypage();
    },
    // 当前页改变
    handleCurrentChange(val){
      this.currentPage = val;
      this.getAccountListBypage();
    },
    //单选框选中状态改变时就会触发这个函数
    handleSelectionChange(val) {
      //把选中的账号保存到一个变量中
      this.selectionAccount = val;
    },
    //修改账号
    handleEdit(id) {
      //保存原来的id
      this.editId = id;
      //发送axios请求 把id发送给后端
      this.axios.get(`http://127.0.0.1:666/account/accountedit?id=${id}`)
      .then(response=>{
        let result = response.data[0];
        this.editForm.username = result.username;
        this.editForm.usergroup = result.usergroup;
        //显示模态框
        this.flag = true;
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //删除账号
    handleDelete(id) {
      //弹出提示框
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`http://127.0.0.1:666/account/accountdel?id=${id}`)
            .then(response => {
              let { error_code, reason } = response.data;
              //判断
              if (error_code === 0) {
                //删除成功提示信息
                this.$message({
                  type: "success",
                  message: reason
                });
                //刷新列表 
                this.getAccountListBypage();
              } else {
                //删除失败提示信息
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //保存修改数据
    saveEdit(){
      //收集新数据和原来的id
      let params = {
        username:this.editForm.username,
        usergroup:this.editForm.usergroup,
        editId:this.editId
      }

      //发送axios请求 把新数据和原来的id发送给后端
      this.axios.post('http://127.0.0.1:666/account/saveEdit',qs.stringify(params))
      .then(response=>{
        let { error_code, reason} = response.data;
        if(error_code === 0){
          this.$message({
            type:'success',
            message:reason
          })
          //刷新列表
          this.getAccountListBypage();
        }else{
          this.$message.error(reason);
        }
        //关闭模态框
        this.flag = false;
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //批量删除
    batchDelete(){
      //遍历被选中的账号 并得到他们的id
      let selectionAccountId = this.selectionAccount.map(v => v.id);

      this.$confirm("你确定要删除吗？", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(()=>{
          //发送axios请求 把要被删除的id发送给后端
          this.axios.get('http://127.0.0.1:666/account/batchdelete',{
            params:{
              selectionAccountId
            }
          })
          .then(response=>{
            console.log(response.data)
            let {error_code,reason} = response.data;
            //判断
            if(error_code === 0){
              this.$message({
                type:'success',
                message:reason
              });
              //刷新列表
              this.getAccountListBypage();
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
    //取消选择
    cancelSelect(){
      this.$refs.multipleTable.clearSelection();
    }
  },
  //过滤器
  filters: {
    //过滤时间的函数
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less">
.account-manage {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>


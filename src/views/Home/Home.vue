<template>
    <div class="home">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统信息</span>
            </div>
            <div class="text item">
                <el-alert
                    title="商品总数：5。已经销售的总金额：999.00。库存商品总价：9999.00"
                    type="info"
                    show-icon>
                </el-alert>

                <el-alert
                    title="导入数据"
                    type="success"
                    show-icon>
                </el-alert>

                <el-row>
                   <el-col :span="10">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>销售排行</span>
                            </div>
                            <div class="text item">
                                 <el-table
                                    :data="homeData"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="product"
                                        label="商品名称"
                                        width="280">
                                    </el-table-column>

                                    <el-table-column
                                        prop="salesNum"
                                        label="销量"
                                        width="100">
                                    </el-table-column>

                                    <el-table-column
                                        prop="date"
                                        label="日期"
                                        width="200">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                   </el-col>

                   <el-col :span="14">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>缺货的商品</span>
                            </div>
                            <div class="text item">
                                <el-table
                                    :data="homeDataRight"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="product"
                                        label="商品名称"
                                        width="240">
                                    </el-table-column>
                                    <el-table-column
                                        prop="inventory"
                                        label="库存"
                                        width="125">
                                    </el-table-column>
                                    <el-table-column width="200" label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                        size="mini" type="primary"><i class="el-icon-edit">编辑</i></el-button>
                                        <el-button
                                        size="mini"
                                        type="danger"><i class="el-icon-delete">删除</i></el-button>
                                    </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                   </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            homeData:[
                {
                product:"海飞丝去屑洗发水",
                salesNum:5,
                date:"2018-12-31",
                },
                {
                product:"茅台酒",
                salesNum:20,
                date:"2018-12-31",
                },
                {
                product:"海龙凤呈祥",
                salesNum:45,
                date:"2018-12-31",
                },
                {
                product:"你的优乐美",
                salesNum:99,
                date:"2018-12-31",
                },
                {
                product:"老干妈",
                salesNum:33,
                date:"2018-12-31",
                },
            ],
            homeDataRight:[
                {
                    product:"你的优乐美",
                    inventory:"12",
                },
                {
                    product:"茅台酒",
                    inventory:"0"
                },
                {
                    product:"海飞丝去屑洗发液",
                    inventory:"2"
                },
            ]
        }
    }
}
</script>

<style lang="less">
.home{
    .el-alert{
        margin: 20px 0;
    }
    .el-card{
        border-radius: 8px;
        .el-card__header{
            text-align: left;
            font-size: 20px;
            font-weight: 800;
            background-color: #ccc;
        }
        .text{
            .el-row{
                .el-col-10{
                    .el-card{
                        width: 620px;
                    }
                }
            }
        }
    }
}
</style>



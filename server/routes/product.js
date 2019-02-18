const express = require('express');
const router = express.Router();

const connection = require('./connect')

//统一设置响应头 解决跨域问题
router.all('*',(req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  next();
})

/* 添加商品路由 */
router.post('/productadd', function(req, res) {
  //接收数据
  let {productNum,name,region,salePrice,cxPrice,scPrice,inventory,allMoney,saleMoney} = req.body;
  //构造sql语句
  let sqlStr = `insert into product(productNum,name,region,salePrice,cxPrice,scPrice,inventory,allMoney,saleMoney) values('${productNum}','${name}','${region}','${salePrice}','${cxPrice}','${scPrice}','${inventory}','${allMoney}','${saleMoney}')`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //判断受影响行数
    if(data.affectedRows > 0){
      //发送成功的数据对象给前端
      res.send({"error_code":0,"reason":"添加数据成功"})
    }else{
      res.send({"error_code":1,"reason":"添加数据失败"})
    }
  })
});

//通过分页查询所有数据的路由
router.get('/productlistbypage',(req,res)=>{
  //接收传入的当前页码和每页显示条数
  let {pageSize,currentPage} = req.query;
  //构造sql语句
  let sqlStr = 'select * from product';
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //获取查询的数据的总长度（总条数）
    let total = data.length;

    //设置分页条件
    let n = (currentPage - 1) * pageSize;
    //拼接sql语句
    sqlStr += ` limit ${n},${pageSize}`;

    //执行拼接好的sql语句
    connection.query(sqlStr,(err,data)=>{
      if(err) throw err;
      //返回数据给前端
      res.send({
        total,
        data
      })
    })
  })
})

//删除商品数据路由
router.get('/productdel',(req,res)=>{
  //接收id
  let {id} = req.query;
  //构造sql语句
  let sqlStr = `delete from product where id=${id}`;
  //执行sql
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //判断受影响行数
    if(data.affectedRows > 0){
      //返回删除成功的数据对象给前端
      res.send({"error_code":0,"reason":"删除商品成功"})
    }else{
      //返回删除失败的数据对象给前端
      res.send({"error_code":1,"reason":"删除商品失败"})
    }
  })
})

//接收修改- 回填数据的路由
router.get('/productedit',(req,res)=>{
  //接收前端发送的id
  let {id} = req.query;
  //构造sql语句
  let sqlStr = `select * from product where id=${id}`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //把查询的数据返回给前端
    res.send(data);
  })
})

//接收修改- 保存修改后的数据
router.post('/saveproductedit',(req,res)=>{
  //接收前端发送的数据和id
  let {name,region,editId} = req.body;
  //构造sql语句
  let sqlStr = `update product set name='${name}',region='${region}' where id=${editId}`
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //判断受影响行数
    if(data.affectedRows > 0){
      //返回成功的数据对象给前端
      res.send({"error_code":0,"reason":"修改数据成功"})
    }else{
      //返回失败的数据对象给前端
      res.send({"error_code":1,"reason":"修改数据失败"})
    }
  })
})

//批量删除请求的路由
router.get('/batchdelete',(req,res)=>{
  //接收传入的id
  let {selectionId} = req.query;
  //构造sql语句
  let sqlStr = `delete from product where id in (${selectionId})`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //判断受影响行数
    if(data.affectedRows > 0){
      //返回成功的数据对象给前端
      res.send({"error_code":0,"reason":"批量删除成功"})
    }else{
      //返回失败的数据对象给前端
      res.send({"error_code":1,"reason":"批量删除失败"})
    }
  })
})
module.exports = router;

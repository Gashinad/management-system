const express = require('express');
const router = express.Router();
//引入数据库连接模块
const connection = require('./connect');

//统一设置响应头 解决跨域问题
router.all('*',(req,res,next)=>{
  //设置响应头
  res.header('Access-Control-Allow-Origin','*');
  next();
})

/* 添加账号路由 */
router.post('/accountadd', function(req, res) {
  //接收前端穿过来的参数
  let{username,password,usergroup} = req.body;

  //把数据存入数据库
  //创建sql语句
  let sqlStr = `insert into account(username,password,usergroup) values('${username}','${password}','${usergroup}')`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //判断受影响的行数
    if(data.affectedRows > 0){
      res.send({"error_code":0,"reason":"添加账号成功"})
    }else{
      res.send({"error_code":1,"reason":"添加账号失败"})
    }
  })
});

//通过分页显示账号列表的路由 
router.get('/accountlistbypage',(req,res)=>{
  //接收传入的当前页码和每页显示条数
  let {pageSize,currentPage} = req.query;
  //构造sql语句
  let sqlStr = 'select * from account order by ctime desc';
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

//删除账号请求的路由
router.get('/accountdel',(req,res)=>{
  //接收传入的id
  let {id} = req.query;
  //构造sql语句
  let sqlStr = `delete from account where id=${id}`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //根据删除结果判断
    if(data.affectedRows > 0){
      //如果受影响行数大于0 删除成功
      res.send({"error_code":0,"reason":"删除账号成功"})
    }else{
      //否则 删除失败
      res.send({"error_code":1,"reason":"删除账号失败"})
    }
  })
})

//接收修改- 回填数据请求
router.get('/accountedit',(req,res)=>{
  //接收传入的id
  let {id} = req.query;
  //构造sql语句
  let sqlStr = `select * from account where id=${id}`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //把查询的数据返回给前端
    res.send(data)
  })
})

//接收修改- 保存新数据请求
router.post('/saveEdit',(req,res)=>{
  let {username,usergroup,editId} = req.body;
  //构造sql语句
  let sqlStr = `update account set username='${username}',usergroup='${usergroup}' where id=${editId}`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //判断受影响行数
    if(data.affectedRows > 0){
      res.send({"error_code":0,"reason":"修改账号成功"})
    }else{
      res.send({"error_code":1,"reason":"修改账号失败"})
    }
  })
})

//接收批量删除请求的路由
router.get('/batchdelete',(req,res)=>{
  //接收要被删除的账号的id
  let {selectionAccountId} = req.query;
  //构造sql语句
  let sqlStr = `delete from account where id in (${selectionAccountId})`;
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

//验证旧密码是否正确
router.get('/checkOldPwd',(req,res)=>{
  //接收前端传入的原密码和用户名
  let{oldPwd,username} = req.query;
  //构造sql语句
  let sqlStr = `select * from account where username='${username}' and password='${oldPwd}'`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //判断查询的数据是否存在
    if(!data.length){
      //查询的数据不存在
      res.send({"error_code":1,"reason":"原密码错误！"});
    }else{
      //查询数据存在
      res.send({"error_code":0,"reason":"原密码正确！"});
    }
  })
})

//保存新密码路由
router.post('/savenewpwd',(req,res)=>{
  //接收前端传入的数据
  let {username,newPassword,oldPassword} = req.body;
  //构造sql语句
  let sqlStr = `update account set password='${newPassword}' where username='${username}' and password='${oldPassword}'`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    //判断受影响行数
    if(data.affectedRows > 0){
      //返回成功的数据跟前端
      res.send({"error_code":0,"reason":"修改密码成功！"})
    }else{
      //返回失败的数据给前端
      res.send({"error_code":1,"reason":"修改密码失败！"})
    }
  })
})
module.exports = router;

const express = require('express');
const router = express.Router();

//引入连接数据库模块
const connection = require('./connect');

//引入jwt
const jwt = require('jsonwebtoken');
//定义密匙
const secretKey = 'supermarket';

/* 统一设置响应头 解决跨域问题 */
router.all('*', function(req, res, next) {
    // 设置响应头 解决跨域(目前最主流的方式)
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//接收前端发送的数据
router.post('/checklogin',(req,res)=>{
  //接收前端发送的账号和密码
  let {username,password} = req.body;
  // 构造sql语句
  let sqlStr = `select * from account where username='${username}' and password='${password}'`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if (err) throw err;
    //如果不存在
    if(!data.length){
      res.send({"error_code":1,"reason":"请检查用户名或者密码"})
    }else{
      //当前登录账号数据
      const obj = data[0];
      //深拷贝 
      //转为字符串
      const objStr = JSON.stringify(obj);
      //生成全新的对象
      const accountInfo = JSON.parse(objStr);
      //生成token
      const token = jwt.sign(accountInfo,secretKey,{expiresIn:60 * 60});

      res.send({
        "error_code":0,
        "reason":"欢迎您！登录成功!",
        token,
        "username":accountInfo.username
      })
    }
  })
})

module.exports = router;

const Koa = require('koa')//我们导入的是class，因此用大写的Koa表示
const app = new Koa()   //创建一个Koa对象表示web app本身

// 对于任何请求，app将调用该异步函数处理请求
app.use( async ( ctx ) => {  
  ctx.body = 'Hello Koa2'
})

app.listen(3000) //设置监听端口
console.log('koa2 is starting at port 3000');
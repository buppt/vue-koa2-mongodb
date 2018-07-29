const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.request.url
  ctx.body = url
})
app.listen(3000);
console.log('koa2 is starting at port 3000');
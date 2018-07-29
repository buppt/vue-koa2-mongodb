const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa()
 
const staticPath = './demo12'
 
app.use(static(
  path.join( __dirname,  staticPath)
))

app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})
 
app.listen(3000, () => {
  console.log('server is starting at port 3000')
})
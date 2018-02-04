const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

//子路由1
let home = new Router();
home.get('/home', async(ctx)=>{
    ctx.body="Hello /home/home/";
});
home.get('/todo',async(ctx)=>{
    ctx.body="Hello /home/todo/";
});
//子路由2 
let page = new Router();
page.get('/home', async(ctx)=>{
    ctx.body="Hello /page/home/";
});
page.get('/todo',async(ctx)=>{
    ctx.body="Hello /page/todo/";
});
//父级路由
let router = new Router();
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000,()=>{
  console.log('starting at port 3000');
});
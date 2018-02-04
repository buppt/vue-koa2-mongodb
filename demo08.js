const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
	let url=ctx.url; //获取url
	// 从上下文中直接获取数据
	let ctx_query = ctx.query; //query返回格式化的对象
	let ctx_querystring = ctx.querystring; //querystring返回原字符
	// 从上下文的request对象中获取
	let request=ctx.request;
	let req_query=request.query; //query返回格式化好的对象
	let req_querystring=request.querystring; //querystring返回原字符串。
	ctx.body={
		url,
		ctx_query,
	    ctx_querystring,
		req_query,
		req_querystring
	}
});
app.listen(3000,()=>{
	console.log('server is starting at port 3000');
});
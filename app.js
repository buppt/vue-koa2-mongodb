const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');


const app = new Koa()

app.use(bodyParser());

const staticPath = './dist'
 
app.use(static(
  path.join( __dirname,  staticPath)
))

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";
var db

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  console.log("数据库连接已创建!");
  
  db=database;
  
  app.listen(3000, () => {
	  console.log('server is starting at port 3000')
	})
});

const findMemo=()=>{
	return new Promise((resolve,reject)=>{
		db.db("test").collection("memo").find({}).sort({"finish":1}).toArray((err,res)=>{
			if(err) reject(err);
			resolve(res)
		})
	})
}
const updateMemo=(searchObj,updateObj)=>{
	return new Promise((resolve,reject)=>{
		db.db("test").collection("memo").updateOne(searchObj,updateObj,(err,res)=>{
			if(err) reject(err);
			resolve("success")
		})
	})
}

const addMemo = (obj)=>{
  return new Promise((resolve,reject)=>{
    db.db("test").collection("memo").insertOne(obj,(err,res)=>{
      if(err) reject(err);
			resolve("success")
    })
  })
}

const delMemo = (obj)=>{
  return new Promise((resolve,reject)=>{
    db.db("test").collection("memo").deleteOne(obj,(err,res)=>{
      if(err) reject(err);
			resolve("success")
    })
  })
}
app.use( async ( ctx ) => {
    if(ctx.url=='/api/addMemo' && ctx.method=='POST'){
      let postData = ctx.request.body;
      if(postData!=""){
        let obj = {"content":postData.content,"finish":0}
        let response = await addMemo(obj)
        ctx.body=response;
      }
      return ;
    }
    
    if(ctx.url=='/api/getMemo' && ctx.method=='GET'){
      let response = await findMemo();
      ctx.body = response
      return ;
    }
    
    if(ctx.url=='/api/updateMemo' && ctx.method=='PUT'){
      let postData = ctx.request.body;
      let searchObj = {"content":postData.content} 
      let updateObj = {$set:{"finish":1}}
      let response = await updateMemo(searchObj,updateObj)
      ctx.body = response
      return ;
    }
    
    if(ctx.url.substring(0,13)=='/api/delMemo/' && ctx.method=='DELETE'){
        let things=decodeURI(ctx.url.substring(13,));
        let obj = {"content":things}
        let response = await delMemo(obj);
        ctx.body = response;
        return;
    }
})
 

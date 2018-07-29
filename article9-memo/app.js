const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
var mysql = require('mysql');

const app = new Koa()

app.use(bodyParser());

const staticPath = './dist'
 
app.use(static(
  path.join( __dirname,  staticPath)
))

let config = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'koaDemo',
    port:3306,
    multipleStatements: true//允许多条sql同时执行
};
let pool = mysql.createPool(config);
let query = (sql) => {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
};
app.use( async ( ctx ) => {
    if(ctx.url=='/api/addMemo' && ctx.method=='POST'){
        let postData = ctx.request.body;
        if(postData!=""){
            let sql = 'insert into memo (things,status) values("'+postData.things+'",0)';
            await query(sql).then(res => {

            }).catch(e => {
                console.log(e)
            })
            ctx.body={
                status:true
            };
        }else{
            ctx.body={
                status:false
            };
        }
    }else if(ctx.url=='/api/getMemo' && ctx.method=='GET'){
        let sql = 'SELECT * FROM memo';
        await query(sql).then(res => {
            let items=[],itemsFinished=[];
            for(i in res){
                if(res[i].status==0){
                    items.push(res[i].things)
                }else{
                    itemsFinished.push(res[i].things)
                }
            }
            ctx.body={
                items:items,
                itemsFinished:itemsFinished
            }
        }).catch(e => {
            console.log(e)
        })
    }else if(ctx.url=='/api/updateMemo' && ctx.method=='PUT'){
        let postData = ctx.request.body;

        let sql = 'update memo set status=1 where things="'+postData.things+'"';
        await query(sql).then(res => {
            ctx.body={
                status:true
            };
        }).catch(e => {
            console.log(e)
            ctx.body={
                status:false
            };
        })  
    
    }else if(ctx.url.substring(0,13)=='/api/delMemo/' && ctx.method=='DELETE'){
        let things=decodeURI(ctx.url.substring(13,));
        let sql = 'delete from memo where things="'+things+'"';
        await query(sql).then(res => {
            ctx.body={
                status:true
            };
        }).catch(e => {
            console.log(e)
            ctx.body={
                status:false
            };
        })
        
    
    }
})
 
app.listen(3000, () => {
  console.log('server is starting at port 3000')
})
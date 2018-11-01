# koa2-learn-demo
主要是为了尝试一下koa2连接使用mongodb和mysql。

<img src = './static/memo.gif' width = '100%' />

## mongodb数据库

master分支是mongodb练习

``` 
npm install
```

<a href="https://www.mongodb.com/download-center/community">mongodb官网</a>，具体安装、使用和简单操作可以查看<a href="https://blog.csdn.net/buppt/article/details/83586179">这篇文章</a>。

开启mongodb数据库后。

```
node app.js
```

由于做了静态资源服务器，可以直接访问`localhost:3000`。


也可以再开一个终端，`npm run dev`，`localhost:8080`。


## mysql数据库

mysql分支是mysql练习。

下载安装好mysql后，在`app.js`中设置自己mysql的密码。

在mysql中创建数据库和数据表。
```
create database koaDemo;
use koaDemo;

create table if not exists memo(
id INT NOT NULL AUTO_INCREMENT,
things VARCHAR(100) NOT NULL,
status TINYINT NOT NULL,
PRIMARY KEY ( id )
);

```
剩下同上。



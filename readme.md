# koa2-learn-demo

<img src = './static/memo.gif' width = '50%' />


## install 

``` 
npm install
```

You need to install MySQL and modify mysql's password in `app.js` .

Then create a new database and a table .
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

## run

```
node app.js
```

`server starts at localhost:3000`
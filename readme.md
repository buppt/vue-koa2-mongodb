# koa2-learn-demo

<img src = './static/memo.gif' width = '100%' />


## Install 

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

## Run

```
node app.js
```

Server starts at localhost:3000 .

This `app.js` makes a static resource server for `dist` folder.

`dist` folder is built by vue.

So you can visit localhost:3000 for production environment.

Also you can run in another terminal
```
npm run dev
```
and visit localhost:8080 for development environment . It uses apis at localhost:3000 .  


If you modify vue code, you can run 
```
npm run build
```
and then you can visit localhost:3000 for production environment .
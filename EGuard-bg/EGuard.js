'use strict';
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const json = require('koa-json');
const KoaBodyParser = require('koa-bodyparser');
const controller = require('./controller');
const path = require('path');
const render = require('koa-ejs'); 
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// json pretty
app.use(json());

// 配置模板引擎
// render(app, {
//     root: path.join(__dirname, 'views'),
//     layout: 'layout',
//     viewExt: 'html',
//     cache: false,
//     debug: false
// });
// router.get('/', index});
// async function  index(ctx){
//     await ctx.render('index',{
//         title: 'this is my app'
//     }); 
// }

// add router middleware:
app.use(KoaBodyParser());
// 配置路由模块
app.use(router.routes());
// .use(router.allowedMethods()

app.use(controller());

// 在端口3000监听:
app.listen(3000, ()=> console.log('Server Started...'));
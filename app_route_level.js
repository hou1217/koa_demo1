const Koa = require('koa')
// 引入和实例化路由
const Router = require('koa-router')
// 模板中间件
// const views = require('koa-views')
// art模板
const render = require('koa-art-template')
const path = require('path')
// koa实例化
const app = new Koa()

// 1.使用ejs模板
// app.use(views('views',{
//   extension: 'ejs' //应用ejs模版引擎
// }))
// 2.使用art模板
render(app,{
  root: path.join(__dirname, 'views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});
//子路由模块
const index = require('./routes/index')
const news = require('./routes/news')
let router = new Router();
// 路由分层
router.use('/index',index.routes(),index.allowedMethods());
router.use('/news',news.routes(),news.allowedMethods());

//加载路由中间件
app
  .use(router.routes())//启动路由
  .use(router.allowedMethods()) //默认加响应头

app.listen(3001,()=>{
  console.log('服务器启动了');
})
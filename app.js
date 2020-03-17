const Koa = require('koa')
// 引入和实例化路由
// const router = require('koa-router')()
// 模板中间件
const views = require('koa-views')
const path = require('path')
// 静态文件中间件
const static = require('koa-static')
// art模板
const render = require('koa-art-template')
// koa实例化
const app = new Koa()
// 使用第三方中间件
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

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

// 使用静态文件中间件
const staticPath = './static'
app.use(static(path.join(__dirname,staticPath)))
// 使用中间件
// app.use(async (ctx,next) => {
//   console.log('这是一个中间件');
//   next()//当前路由匹配完成之后继续向下匹配
//   if(ctx.status == 404){
//     ctx.body = '找不到此页面'
//   }else{
//     console.log(ctx.url);
//   }
// })

// 中间件配置公共数据
app.use(async (ctx,next) => {
  ctx.state.name = 'zhangsan';
  await next();
})
// 引入子路由
const index = require('./routes/index')
const news = require('./routes/news')
// 不分层
app.use(index.routes(), index.allowedMethods());
app.use(news.routes(), news.allowedMethods());


//加载路由中间件
// app
//   .use(router.routes())//启动路由
//   .use(router.allowedMethods()) //默认加响应头

app.listen(3001,()=>{
  console.log('服务器启动了');
})
const Koa = require('koa')
// 引入和实例化路由
const router = require('koa-router')()
// 
const views = require('koa-views')
// koa实例化
const app = new Koa()

app.use(views('views',{
  extension: 'ejs' //应用ejs模版引擎
}))
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

// 配置路由
router.get('/',async (ctx) => { //路由中间件
  let title = 'hello,ejs'
  await ctx.render('index',{
    title: title
  })
})
router.get('/news',async (ctx) => {
  let arr = [1,2,3,4,5]
  await ctx.render('news',{
    list: arr,
    num: 23
  })
})
// 动态路由
router.get('/newsDetail',async (ctx) => {
  // 从ctx读取query
  console.log(ctx.query);//****推荐
  console.log(ctx.params);
  console.log(ctx.querystring);
  console.log(ctx.url);

  ctx.body='newsDetail';
})
app
  .use(router.routes())//启动路由
  .use(router.allowedMethods()) //默认加响应头

app.listen(3001)
console.log('服务器启动了');
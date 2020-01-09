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

// 配置路由
router.get('/',async (ctx) => { //路由中间件
  let title = ctx.cookies.get('token')
  await ctx.render('index',{
    title: title
  })
})
router.get('/login',async (ctx) => { //路由中间件
  ctx.cookies.set(
    'token','hys123',{
      domain:'127.0.0.1', // 写cookie所在的域名
      path:'/',       // 写cookie所在的路径,配置可以访问的页面
      maxAge:1000*60*60*24,   // cookie有效时长
      expires:new Date('2020-02-01'), // cookie失效时间
      httpOnly:false,  // 是否只用于http请求中获取，如果是true只有服务器端才可以访问，false表示客户端和服务器端都可以访问
      overwrite:false  // 是否允许重写
    }
  );
  let title = 'login,ejs'
  await ctx.render('login',{
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
  ctx.body='newsDetail';
})

//加载路由中间件
app.use(router.routes())//启动路由
.use(router.allowedMethods()) //默认加响应头

app.listen(3005,()=>{
  console.log('服务器启动了');
})
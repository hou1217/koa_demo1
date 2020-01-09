const Koa = require('koa')
// 引入和实例化路由
const router = require('koa-router')()
// 
const views = require('koa-views')
// 
const session = require('koa-session')
// koa实例化
const app = new Koa()

app.use(views('views',{
  extension: 'ejs' //应用ejs模版引擎
}))

//配置session的中间件
app.keys = ['some secret hurr']; //cookie的签名
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: false, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
 
app.use(session(CONFIG,app))



// 配置路由
router.get('/',async (ctx) => { //路由中间件
  let title = ctx.session.username
  await ctx.render('index',{
    title: title
  })
})
router.get('/login',async (ctx) => { //路由中间件
  ctx.session.username = 'lisi'
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
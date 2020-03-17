const router = require('koa-router')()
// 配置路由
router.get('/',async (ctx) => { //路由中间件
  let title = 'hello,ejs'
  await ctx.render('index',{
    title: title,
    value:'<h3>原样输出</h3>',
    age: 20,
    list: [1,2,3,4,5],
  })
})
router.get('/login',async (ctx) => { //路由中间件
  let title = 'login,ejs'
  await ctx.render('login',{
    title: title
  })
})
router.post('/login',async (ctx) => { //路由中间件
  ctx.body = ctx.request.body;
})
module.exports = router;
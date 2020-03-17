const router = require('koa-router')()
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
module.exports = router;
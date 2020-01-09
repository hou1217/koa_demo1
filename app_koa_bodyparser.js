const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
app.use(views('views',{
  extension: 'ejs' //应用ejs模版引擎
}))

// 使用第三方中间件
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
// 自己写的中间件
// const {parsePostData} = require('./public/js/public.js')

app.use(async(ctx)=>{
  //当请求时GET请求时，显示表单让用户填写
  if(ctx.url==='/' && ctx.method === 'GET'){
    await ctx.render('form')
    //当请求时POST请求时
  }else if(ctx.url==='/' && ctx.method === 'POST'){
    let postData= ctx.request.body;
    ctx.body=postData;
  }else{
    //其它请求显示404页面
    ctx.body='<h1>404!</h1>';
  }
})
app.listen(3002,()=>{
  console.log('服务器启动了');
})

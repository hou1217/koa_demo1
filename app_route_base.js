const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

function render(htmlPage){
  return  new Promise((resolve,reject)=>{
    let pageUrl = `./page/${htmlPage}`;
    fs.readFile(pageUrl,"binary",(err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data);
      }
    })
  })
}

async function route(url){
  let htmlPage = '404.html';
  switch(url){
    case '/':
      htmlPage ='index.html';
      break;
    case '/index':
      htmlPage ='index.html';
      break;
    case '/news':
      htmlPage = 'news.html';
      break;
    case '/404':
      htmlPage = '404.html';
      break;
    default:
      htmlPage = '404.html';
      break; 
  }
  let html = await render(htmlPage);

  return html;
}

app.use(async(ctx)=>{
  let url = ctx.request.url;
  let html = await route(url);
  ctx.body = html;
})
app.listen(3003,()=>{
  console.log('服务器启动了');
})

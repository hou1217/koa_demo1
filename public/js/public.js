function parseQueryStr(queryStr){
  let queryData={};
  let queryStrList = queryStr.split('&');
  console.log(queryStrList);
  for( let [index,queryStr] of queryStrList.entries() ){
      let itemList = queryStr.split('=');
      console.log(itemList);
      queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  } 
  return queryData
}
function parsePostData(ctx){
  return new Promise((resolve,reject)=>{
    try{
      let postdata="";
      ctx.req.on('data',(data)=>{
        postdata += data
      })
      ctx.req.on("end",()=>{
        let parseData = parseQueryStr( postdata )
        resolve(parseData);
      })
    }catch(error){
      reject(error);
    }
  });
}
module.exports = {
  parseQueryStr,
  parsePostData
}
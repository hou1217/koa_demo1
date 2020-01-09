let name = new Buffer.from('张三').toString('base64')
console.log(name);
let origin = new Buffer.from(name,'base64').toString()
console.log(origin);

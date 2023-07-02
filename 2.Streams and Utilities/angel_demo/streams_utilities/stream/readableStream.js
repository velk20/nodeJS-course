const fs = require('fs');
const path = require('path');

let readStream = fs.createReadStream(path.resolve(__dirname,'./data.txt'), {encoding: "utf-8"});
let count = 1;
readStream.on('data',(chunk)=>{
    console.log(`new chunk ${count++}`);
    console.log(chunk);
})

readStream.on('close', ()=>{
    console.log('Stream closed');
})
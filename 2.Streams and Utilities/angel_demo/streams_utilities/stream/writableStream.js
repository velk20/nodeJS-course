const fs = require('fs')

let writeStream = fs.createWriteStream('./output.txt', {encoding: "utf-8",flags:'a'});

const  chunk1='dasd'
const  chunk2='dsadas'
const  chunk3='dasd'

writeStream.write(chunk1 +'\n')
writeStream.write(chunk2+'\n')
writeStream.write(chunk3+'\n');

writeStream.on('close',()=>{
    console.log('Spiram');
})
writeStream.end();
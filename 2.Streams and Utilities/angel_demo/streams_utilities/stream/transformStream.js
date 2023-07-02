const fs = require('fs');
const zlib = require('zlib');

let gzip = zlib.createGzip();

let readStream = fs.createReadStream('./data.txt');
let writeStream = fs.createWriteStream('./data-transform.txt');

readStream.pipe(gzip).pipe(writeStream);
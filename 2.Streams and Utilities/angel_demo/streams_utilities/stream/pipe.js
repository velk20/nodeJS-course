const fs = require('fs');

let readStream = fs.createReadStream('./data.txt');
let writeStream = fs.createWriteStream('./data-copy.txt');

readStream.pipe(writeStream);


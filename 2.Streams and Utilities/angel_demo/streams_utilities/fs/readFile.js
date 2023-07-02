const fs = require('fs');
const fsp = require('fs/promises');

//Sync reading : simple read small file
const text = fs.readFileSync('./data.txt',{encoding:"utf-8"});
console.log("read from file")
console.log(text);

//Async reading: for better performance without pausing the program
fs.readFile('./data.txt',{encoding:"utf-8"}, (err,data)=>{
    if (err) {
        console.log("ERROR")
        return;
    }

    console.log(data);
});
console.log("read from file: ASYNC")

//Async reading with promises
fsp.readFile('./data.txt', {encoding: "utf-8"})
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    });
console.log("read from file: ASYNC with promises")


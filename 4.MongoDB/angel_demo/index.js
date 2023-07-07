const mongoose = require('mongoose');
const Cat = require('./models/Cat')
const Student = require('./models/Student')
async function main() {

  //!DB CONNECTION
  await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');
  console.log('DB connected');

  //! CREATE
  // await saveCat('Notarachee', 22, 'Street Cat');

  //!READ
  let cats = await readCats(Cat);
  await readCat('Notarachee');

  //!UPDATE
  await updateCatById('64a7e37476d9012d6c851244', 'updated by id');
  await updateCat('NavNew',"Nav")
  // await updateCats('Angel', 'Angel1');

  //!DELETE


  //!METHOD INVOKE
  console.log('Method schema invoke');
  cats.forEach(cat => {
    cat.makeSound();
    console.log(cat.info);
  });

  //! QUERIES
  console.log('age cat query...');
  let queryCat = await Cat
    .find({})
    .where('age')
    .gt(7)
    .lt(14);
  console.log(queryCat);

  console.log('projection cat query...');
  let projectionCat = await Cat
    .findOne({name: 'Nav'}).select('age');
  console.log(projectionCat);

  console.log('sort,limit,skip cat query...');
  let sortLimitAndSkipASC = await Cat.find({}).sort({age:1}).skip(0).limit(2);
  let sortLimitAndSkipDSC = await Cat.find({}).sort({age:-1}).skip(5).limit(2);
  console.log('ASC'+ sortLimitAndSkipASC);
  console.log('DSC'+sortLimitAndSkipDSC);

  console.log('Insert students with cats');
  insertStudentWithCat();
}
main();


async function saveCat(name, age, breed) {
  // await Cat.create({
  //   name,age, breed,
  // })
  console.log("saving cat");
  const cat = new Cat({
    name, age, breed,
  });

  await cat.save();
}

async function readCat(name) {
  console.log("reading one cat");
  const cat = await Cat.findOne({name});
  console.log(cat);

  return cat;
}

async function readCatById(id) {
  console.log("reading one cat by id");
  const cat = await Cat.findById("64a7f5b1952cba697aa01fd4");
  console.log(cat);

  return cat;
}

async function readCats() {
  console.log('reading all cats');
  const cats = await Cat.find({name:'Angel'});
  console.log(cats);

  return cats;
}

async function updateCat(name, newName) {
  console.log('updating one cat');
  const cats = await Cat.updateOne({name},{name: newName});
  console.log(cats);

  return cats;
}

async function updateCats(name, newName) {
  console.log('updating many cats');
  const cats = await Cat.updateMany({name},{name: newName});
  console.log(cats);

  return cats;
}

async function updateCatById(id, newName) {
  console.log('updating cat by id');
  const cats = await Cat.findByIdAndUpdate(id,{name: newName});
  console.log(cats);

  return cats;
}

async function insertStudentWithCat() {
  await Student.create({
    name: 'angel with 2 cats',
    age: 20,
    cats: ["64a7e1fd472fee54f214c457","64a7f5b1952cba697aa01fd4"]
  })
}



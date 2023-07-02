const express = require('express');
const handlebars = require('express-handlebars');
const loggerMiddleware = require('./loggerMiddleware');

const app = express();
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/cats', (req, res) => {
  const cats = [
    {name:'Navcho', age:21, breed: '1'},
    {name:'Navcho1', age:211, breed: '12'},
    {name:'Navcho2', age:212, breed: '13'}
  ]
  res.render(`cats`,{cats});
});

app.get('/download', (req, res) => {
  res.download('./catJPG.jpg');
});

app.get('/sendFile', (req, res) => {
  res.sendFile('./catJPG.jpg', {root: __dirname});
});

app.get('/attachment', (req, res) => {
  res.attachment('./catJPG.jpg');// with no end() , used when need additional config
});

//! MIDDLEWARES
const validateCatID = (req, res, next) => {
  let catID = Number(req.params.catId);
  if (!catID) {
    return res.send('Invalid CatId!!');
  }
  req.catId = catID;
  next();
};

app.get('/cats/:catId', validateCatID, (req, res) => {
  let paramObj = req.params;
  console.log(paramObj);
  res.render(`cat`,{catId:paramObj.catId, isOdd: req.catId % 2 != 0});

});

app.get('/json', (req, res) => {
  res.json({id: 1, name: 'Hello'});
});

app.post('/cats', (req, res) => {
  res.send('cat creating');
});

app.put('/cats', (req, res) => {
  res.send('cat updating');
});

app.delete('/cats', (req, res) => {
  res.send('cat deleting');
});

app.get('*', (req, res) => {
  res.send('404');
});


app.listen(5000, () => console.log('server is listening on port 5000....'));

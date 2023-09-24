const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');
const e = require('express');
const {auth} = require('./middlewares/authMiddleware');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/furnitures')
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(err));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
//! npm package cors
app.use(cors());

//! Manual CORS activation
// app.use((req,res,next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Method', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//
//   next();
// })

app.use(auth);

app.get('/',(req,res)=>{
  res.send('Hello from REST');
})

app.use(routes);

app.listen(3030, () => console.log(`REST server is listening on port 3030...`));



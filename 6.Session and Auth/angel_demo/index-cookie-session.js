const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const {v4: uuid} = require('uuid');

const app = express();

const session = {
  secret:"my secret",
  resave:false,
  saveUninitialized: true,
   cookie: {secure: false}
};

//cookie-parse
app.use(cookieParser());
app.use(expressSession(session))
app.get('/', (req,res)=>{
  let id;

  const userId = req.cookies['userId'];
  if (userId){
    id = userId
    console.log('user secret: ', req.session.secret);

  }else {
    id = uuid();
    req.session.secret = `${id} - some secret`;
    res.cookie('userId', id);
  }

  res.send(`Hi User: ${id}`);
})


//custom cookie
// app.get('/', (req,res)=>{
//   let id = uuid();
//
//   const cookie = req.headers.cookie;
//   if (cookie){
//      const [key, value] = cookie.split('=');
//     id = value
//   }else {
//     res.header('Set-Cookie', `userId=${id}`);
//   }
//
//   res.send(`Hi User: ${id}`);
//
// })

app.listen(5000, () => console.log('Server is listening on port 5000...'));
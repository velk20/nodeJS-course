const express = require('express');
const cookieParser = require('cookie-parser');
const {v4: uuid} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const secret = 'mysecrettop';
//cookie-parse
app.use(cookieParser());

//NEEDED TO EXTRACT FROM FORM !!!
app.use(express.urlencoded({extended: false}))

const users = {};
app.get('/', (req,res)=>{
  res.send('Hello');
})

app.get('/register',(req,res)=>{
  res.send(`
<form action="" method="POST">
    <label for="username">Username</label>
    <input type="text" name="username" id="username">
    <label for="password">Password</label>
    <input type="password" name="password" id="password">

    <input type="submit" value="Login">
</form>
`)
})

app.post('/register',async (req,res)=>{
  const {username, password} = req.body;

  let salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  users[username] ={
    password: hash,
  }
  res.redirect('/login');
})
app.get('/login',(req,res)=>{
res.send(`
<form action="" method="POST">
    <label for="username">Username</label>
    <input type="text" name="username" id="username">
    <label for="password">Password</label>
    <input type="password" name="password" id="password">

    <input type="submit" value="Login">
</form>
`)
})

app.post('/login',async (req,res)=>{
  const {username, password} = req.body;

  const hash = users[username]?.password;
  let isValid = await bcrypt.compare(password, hash);

  if (isValid) {
    //* generate jwt token
    const payload = {username};
    jwt.sign(payload, secret, {expiresIn: '2d'}, (err, token) => {
      if (err) {
        return res.redirect('/404');
      }

      //* set jwt token as cookie
      res.cookie('token', token);
      res.redirect('/profile');
    });
  }else{
    res.status(401).send('Unauthorized!');
  }
})

app.get('/profile', (req, res) => {
  //? Get jwt token
  const token = req.cookies['token'];

  //? Verify token
  if (token) {
    jwt.verify(token, secret, (err, payload)=>{
      if (err){
        return res.status(401).send('Unauthorized!');
      }

      //?Allow request if valid
      return res.send(`profile: ${payload.username}`);
    })
  }

  return res.redirect('/login');
});
app.listen(5000, () => console.log('Server is listening on port 5000...'));
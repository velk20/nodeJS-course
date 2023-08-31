const express = require('express');
const cookieParser = require('cookie-parser');
const {v4: uuid} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('./lib/jwt');

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

    try {
      const token = await jwt.sign(payload, secret, {expiresIn: '2d'});

        //* set jwt token as cookie
        res.cookie('token', token);
        res.redirect('/profile');
    }catch (err){
      res.redirect('/404');
    }

  }else{
    res.status(401).send('Unauthorized!');
  }
})

app.get('/profile', async (req, res) => {
  //? Get jwt token
  const token = req.cookies['token'];

  //? Verify token
  if (token) {
    try {
      const payload = await jwt.verify(token, secret);

      //?Allow request if valid
      return res.send(`profile: ${payload.username}`);
    }catch (err){
      return res.status(401).send('Unauthorized!');
    }

  }

  return res.redirect('/login');
});
app.listen(5000, () => console.log('Server is listening on port 5000...'));
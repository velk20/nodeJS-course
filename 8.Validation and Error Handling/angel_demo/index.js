const express = require('express');
const {isAgeValid} = require('./utils/validations');
const {validateName} = require('./middlewares/middlewares');
const validator = require('validator');
const validExpress = require('express-validator');
const {body, validationResult} = require('express-validator');

const app = express();

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send(`
<form method="POST">
    <label for="name">Name</label>
    <input type="text" name="name" id="name">

   <label for="password">password</label>
    <input type="password" name="password" id="password">
    
    <label for="age">Age</label>
    <input type="number" name="age" id="age">
    
    <label for="email">Email</label>
    <input type="email" name="email" id="email">
    
    <input type="submit" value="create">
</form>`);
});

const bodyEmailValidator = body('email').isEmail().normalizeEmail()

app.post('/',
  validateName,
  body('password')
    .isLength({min:3, max:20})
    .isStrongPassword()
    .trim()
    .withMessage('Invalid password by express-validator'),
  bodyEmailValidator,
  (req,res)=>{
  const {name, age, password} = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()[0].msg);
    }

  if (!isAgeValid(age)) {
    return res.send('Invalid age');
  }

  if (!validator.isStrongPassword(password)) {
    return res.send('Weak password');
  }

  console.log(name, age);
  res.send(`Successfully`);
})

app.listen(5000, () => console.log(`server is listening on port 5000... `));
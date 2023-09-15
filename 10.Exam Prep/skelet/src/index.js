const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {auth} = require('./middlewares/authMiddleware');
const {errorHandler} = require('./middlewares/errorHandlerMiddleware');

const app = express();

//TODO change db name at the end
mongoose.connect(`mongodb://127.0.0.1:27017/petstagram`)
  .then(() => console.log(`DB connected!`))
  .catch(err => console.log('DB Error', err));


app.engine('hbs', handlebars.engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// everything that search in static will be search in public
app.use('/static', express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(auth);
app.use(routes);
app.use(errorHandler);

app.listen(5000, console.log('Server is listening on port 5000...'));
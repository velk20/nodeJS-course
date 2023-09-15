const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
app.engine('hbs', handlebars.engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// everything that search in static will be search in public
app.use('/static', express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(routes);

app.listen(5000, console.log('Server is listening on port 5000...'));
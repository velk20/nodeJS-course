const express = require('express');
const app = express();

//DB connection
const initDatabase = require('./config/databaseInit');

//custom routes
const routes = require('./routes');
const config = require('./config');

//setup handlebars
const setupViewEngine = require('./config/viewEngine');
setupViewEngine(app);

//setup static files (HTML, CSS)
app.use(express.static('src/public'));
//set up the middleware for POST
app.use(express.urlencoded({extended: false}));
//setup routes
app.use(routes);

//init db and start server
initDatabase()
  .then(() => app.listen(config.PORT, () => {
      console.log(`Server is listening on port ${config.PORT}`);
  }))
  .catch((err) => console.error(err));

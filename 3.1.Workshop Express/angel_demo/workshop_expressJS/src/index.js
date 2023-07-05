const express = require('express');
const app = express();

//custom routes
const routes = require('./routes');
const config = require('./config');

//setup handlebars
const setupViewEngine = require('./config/viewEngine');
setupViewEngine(app);

//setup static files (HTML, CSS)
app.use(express.static('src/public'));
//setup the middleware for POST
app.use(express.urlencoded({extended: false}));
//setup routes
app.use(routes);

app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
});

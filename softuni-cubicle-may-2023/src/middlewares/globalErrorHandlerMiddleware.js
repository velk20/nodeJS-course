const {extractErrorMessages} = require('../util/errorHelpers');
module.exports = (err, req, res, next) => {
  res.render('404', {errorMessages: extractErrorMessages(err)});

}
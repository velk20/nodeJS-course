const {getErrorMessage} = require('../util/errorHelpers');

exports.errorHandler = (err, req, res) => {
  res.render('/404', {error: getErrorMessage(err)});
};
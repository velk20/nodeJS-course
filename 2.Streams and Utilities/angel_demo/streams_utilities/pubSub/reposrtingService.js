const eventBus = require('./eventBus.js');

const collect = (data) => {
  console.log('Reporting service - ' + data.method);
};

eventBus.subscribe('request', collect);

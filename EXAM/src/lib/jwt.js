const jsonwebtoken = require('jsonwebtoken');
const util = require('util');

const jwt = {
  sign: util.promisify(jsonwebtoken.sign),
  verify: util.promisify(jsonwebtoken.verify),
  SECRET: 'cUbu1nvLvMu7yJ5rEBB7ywIWXS1XxqUSh7NZsgSLDQ1CMvdEGD5gsJ+uz/u4UF4veUuW+wuM4GqiM9PVrS2aPRxMYlRBuF93u4FFQ+u40kG7oILsZvXW38m7jI+WrDa4iJsNaBIYuRKvtHLEzjF4zhiQxClGV5/9CGUPUTmbPmyG8y/kmxJHnsJvCVUlqxzdcm2vr+Yqp64QmbzLz+TKZC/gpqR5b1sXD1BHKTqO4utWLgyW4kPXo6Q2CFz7VSbrDNh9tOAZHTEMGqsFAt49bpsyGoVzFCGM5pVfJeD8D3M6SfR17yrfnbA0sxllH318MYVqsovlMG1Bu+cTgN+KMg==',
};

module.exports = jwt;
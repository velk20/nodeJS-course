const User = require('../models/User');
const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find().populate('owner').lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).populate('owner').lean();
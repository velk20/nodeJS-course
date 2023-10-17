

const User = require('../models/User');
const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find().populate('owner').lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).populate('owner').lean();

exports.deleteCrypto = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData).lean();

exports.search = async (searchText, payment) => {
    const allCryptos = await this.getAll()
    console.log(allCryptos)
    return allCryptos.filter((x) => x.name.toLowerCase().includes(searchText) && x.payment == payment);
}

exports.buyCrypto = async (cryptoId, userId) => {
    const crypto = await Crypto.findById(cryptoId);
    crypto.boughtCrypto.push(userId);
    return crypto.save();
}
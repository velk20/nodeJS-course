const Electronic = require('../models/Electronic');

const options = {runValidators: true}

exports.create = (electronicData) => Electronic.create(electronicData);

exports.getAll = () => Electronic.find().populate('owner').lean();

exports.getOne = (electronicId) => Electronic.findById(electronicId).populate('owner').lean();

exports.deleteCrypto = (electronicId) => Electronic.findByIdAndDelete(electronicId);

exports.edit = (electronicId, electronicData) => Electronic.findByIdAndUpdate(electronicId, electronicData, options).lean();

exports.buy = async (electronicId, userId) => {
    const electronic = await Electronic.findById(electronicId);
    electronic.buyingList.push(userId);
    return electronic.save();
}

exports.search = async (searchText, type) => {
    const allElectronics = await this.getAll()
    return allElectronics.filter((x) => x.name.toLowerCase().includes(searchText) || x.type == type);
}
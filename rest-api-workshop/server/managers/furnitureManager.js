
const Furniture = require('../models/Furniture');

exports.create = (furnitureData) => Furniture.create(furnitureData);

exports.getAll = async (qs) => {
  let query = Furniture.find();

  if (qs.where){
    let [fieldName, ownerId] = qs.where.split('=');
    ownerId = ownerId.replaceAll('"', '');
    query = query.find({_ownerId: ownerId})

  }
  const result = await query;
  return result;
};
exports.getOne = (furnitureId) => Furniture.findOne({_id:furnitureId});
exports.update = (furnitureId, data) => Furniture.findByIdAndUpdate(furnitureId, data);
exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId);
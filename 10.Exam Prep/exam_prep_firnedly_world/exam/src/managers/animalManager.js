const Animal = require('../models/Animal');
const User = require('../models/User');
const assert = require('assert');

exports.create = (animalData) => Animal.create(animalData);

exports.getLatestAnimals = () => Animal.find().sort({ _id: -1 }).limit(3).lean()

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner').lean();

exports.getAll = () => Animal.find().populate('owner').lean();

exports.edit = (animalId, newAnimal) => Animal.findByIdAndUpdate(animalId, newAnimal).lean();

exports.search = async (searchText) =>  {
    const lean = await Animal.find().lean();
    return lean.filter(x => x.location.toLowerCase().includes(searchText));
};

exports.deleteAnimal = (animalId) => Animal.findByIdAndDelete(animalId);

exports.addDonation = async (animalId, userId) => {
    const animal = await Animal.findById(animalId);
    const user = await User.findById(userId);
    animal.donations.push(user);

    return animal.save();
};
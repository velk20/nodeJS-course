const Photo = require('../models/Photo');

exports.create =  (photoData) =>  Photo.create(photoData);

exports.getAll =  () =>  Photo.find().populate('owner').lean();

exports.getOne = (photoId) => Photo.findById(photoId).populate('owner').lean();

exports.edit = (photoId, newPhoto) => Photo.findByIdAndUpdate(photoId, newPhoto).lean();

exports.deletePhoto = (photoId) => Photo.findByIdAndDelete(photoId);

exports.addComment = async (photoId, commentData) => {
  const photo = await Photo.findById(photoId);

  photo.commentList.push(commentData);

  return photo.save();
};

exports.getByOwner = (userId) => Photo.find({owner: userId})
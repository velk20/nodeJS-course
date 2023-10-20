const Game = require('../models/Game');

exports.create = (gamesData) => Game.create(gamesData);

exports.getAll = () => Game.find().populate('owner').lean();

exports.getOne = (gameId) => Game.findById(gameId).populate('owner').lean();

exports.deleteGame = (gameId) => Game.findByIdAndDelete(gameId);

exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData).lean();

exports.search = async (searchText, platform) => {
    const allGames = await this.getAll()
    return allGames.filter((x) => x.name.toLowerCase().includes(searchText.toLowerCase()) && x.platform == platform);
}

exports.buyGame = async (gameId, userId) => {
    const game = await Game.findById(gameId);
    game.boughtBy.push(userId);
    return game.save();
}
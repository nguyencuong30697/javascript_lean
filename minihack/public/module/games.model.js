const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    user:[{
        type : String,
    }],
    score:[[{
        type: Number,
    }]]
});

const GameModel = mongoose.model('Game',GameSchema);

module.exports = GameModel;

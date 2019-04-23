const mongoose = require('mongoose');

const {Schema} = mongoose;

const choiceSchema = Schema({
    _result: {type:Schema.Types.ObjectId,ref:'Result'},
    choiceValue:Number,
    total:{type:Number,default:0}
});

module.exports = choiceSchema;
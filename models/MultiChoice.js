const mongoose = require('mongoose');
//TODO: NOT DONE YET
const {Schema} = mongoose;

const multiChoiceSchema = Schema({
    _result:{type:Schema.Types.ObjectId,ref:'Result'},
    choiceValue:String,
});

module.exports = multiChoiceSchema;


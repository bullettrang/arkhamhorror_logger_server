const mongoose=require('mongoose');
const {Schema} = mongoose;
const choiceSchema = require('./Choice');
const multiChoiceSchema = require('./MultiChoice');
const resultSchema = new Schema({
    questionID: String,
    choices:[choiceSchema],
    _file:{type:Schema.Types.ObjectId,ref:"File"},
    multiChoices:multiChoiceSchema,
    scenarioTitle:String
})

module.exports=resultSchema;


const mongoose = require('mongoose');
const {Schema} = mongoose;
//const AnswerSchema = require('./Answer');

const scenarioSchema = new Schema({
    scenarioTitle:String,
    answers:[],
    _file:{type:Schema.Types.ObjectId,ref:'File'},
})

module.exports=scenarioSchema;
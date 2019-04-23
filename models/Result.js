const mongoose=require('mongoose');
const {Schema} = mongoose;
const choiceSchema = require('./Choice');
const resultSchema = new Schema({
    questionID: String,
    choices:[choiceSchema],
    _file:{type:Schema.Types.ObjectId,ref:"File"}
})

module.exports=resultSchema;

// const surveySchema = new Schema({
//     title:String,
//     body:String,
//     subject:String,
//     recipients:[RecipientSchema],
//     yes:{type:Number,default:0},
//     no:{type:Number,default:0},
//     _user:{type:Schema.Types.ObjectId,ref:'User'},
//     dateSent:Date,
//     lastResponded:Date      
// });

const mongoose = require('mongoose');
const {Schema} =mongoose;
const ScenarioSchema = require('./Scenario');
//file consists of an entire campaign

const fileSchema = new Schema({
    campaignTitle:String,
    _user:{type:Schema.Types.ObjectId,ref:'User'},
    completedScenarios:[ScenarioSchema],
    fileName:String
});

module.exports=fileSchema;

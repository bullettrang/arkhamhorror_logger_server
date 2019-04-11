const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({     //we can add other properties as we move on,
    googleId:String,
    gmail:String
});

mongoose.model('users',userSchema); //mongoose checks if users schema already exists
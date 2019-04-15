const passport =require('passport');
const GoogleStrategy =  require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
    done(null,user.id)      //userID here refers to the mongodb, we might get new OAuth signins, so we use mongodo's id
});

//deserializeUser looks over entire mongodb data base and finds the user by id and we get the user object back
passport.deserializeUser((id,done)=>{
    User.findById(id)
        .then(user=>{
            done(null,user);
        })
})
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
}, (accessToken,refreshToken,profile,done)=>{
    console.log('PROFILE ',profile);
    User.findOne({googleId:profile.id})
        .then((existingUser)=>{
            if(existingUser){
                done(null,existingUser);
            }
            else{
                 new User({googleId:profile.id})
                    .save()
                    .then(user=>done(null,user))
            }
        })
}));
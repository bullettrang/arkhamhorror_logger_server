const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true });

const app =express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys:[keys.cookieKey]
    })
);
app.use(express.json());       // to support JSON-encoded bodies
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
require('./routes/choicesRoute')(app);

if(process.env.NODE_ENV === 'production'){

    //express will serve up our production assets
    //like main.js file
    app.use(express.static('arkhamhorrorlogger2/build'));        
    //express will serve index.html if it doesn't recognize the route
    const path =require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'arkhamhorrorlogger2','build','index.html'));
    })
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//production
//https://obscure-cliffs-25810.herokuapp.com
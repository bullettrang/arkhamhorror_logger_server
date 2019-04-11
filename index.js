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

app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//todo
//add mongodb 
//npm install mongoose
//add cluster

//mongodb+srv://btrangcal:<password>@arkham-horror-logger-9e26v.mongodb.net/test?retryWrites=true

//btrangcal
//password XNocIEoCyVJnwqB8


//production mongodb
//btrangcal
//5Epl0CzJIQfmVbpB


//mongodb+srv://btrangcal:<password>@production-arkham-horror-logger-eakmb.mongodb.net/test?retryWrites=true

//googleapi prod key
//1064043536094-taugk8f2puinp8q40pnhvvmpi8qbjv67.apps.googleusercontent.com
//googleapi client secret prod
//7iaX1rVPcE-FXqtkFegfAxwJ
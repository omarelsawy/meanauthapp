const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database , {useNewUrlParser: true});

mongoose.connection.on('connected' , ()=>{
   console.log('connected to database '+config.database);
});

mongoose.connection.on('error' , (err)=>{
   console.log('database error '+err);
});

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 8080;

app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname , 'public')));

//body parser middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users' , users);

app.get('/' , (req , res)=>{
    res.send('hhhhhh');
});

app.get('*' , (req , res) => res.sendFile(__dirname + '/public/index.html'));

//start server
app.listen(port , ()=>{
  console.log('server start on port '+port);
});

















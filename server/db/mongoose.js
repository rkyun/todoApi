const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//localhost
// mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true});

//heroku
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true});


module.exports = { mongoose };

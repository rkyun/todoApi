const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//localhost
// mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true});

//heroku
mongoose.connect('mongodb://rkn:123@ds137191.mlab.com:37191/todoapp', { useMongoClient: true});
module.exports = { mongoose };

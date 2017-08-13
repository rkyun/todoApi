var env = process.env.NODE_ENV || 'development';

if(env==='development' || env==='test'){
    var config = require('./config.json');

    var envConfig = config[env];
    console.log(envConfig);
    
    
    Object.keys(envConfig).forEach((key)=>{
        process.env[key]=envConfig[key];
    });
}

// if(env==='development'){
//     process.env.PORT = 1337;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/toDoApp';
// } else if(env==='test'){
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/toDoAppTest';
//     process.env.PORT = 3000;
// } else if (env==='production'){
//     process.env.MONGODB_URI = 'mongodb://rkn:123@ds137191.mlab.com:37191/todoapp';
// }
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp,', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connect to MongoDB Server');

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID("5984f560bc76782e80f96fda")
},{
  $inc: {
    age: 1
  },
  $set: {
    name: "Michal Ziom,"
  }
},
{
  ReturnOriginal: false
},

(err, result)=>{
  console.log(JSON.stringify(result, undefined, 2));
});

  db.close();
});

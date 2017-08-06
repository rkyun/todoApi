const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp,', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connect to MongoDB Server');


  db.collection('Todos').find({completed: true}).toArray().then((docs)=>{
      console.log('Todos', JSON.stringify(docs, undefined, 2));
  }, (err)=>{
    console.log(err);
  })
});

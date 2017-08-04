const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp,', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connect to MongoDB Server');


  db.collection('Todos').insertOne({text: "Something to do", completed: false},(err, result)=>{
    if(err){
      console.log("Something goes wrong");
    }

    console.log('Successly Added', JSON.stringify(result.ops, undefined, 2));
  })


  // db.collection('Users').insertOne({name:"Michal", age: 25, location: "Polska"}, (err, result)=>{
  //   if(err){
  //    return  console.log("Something goes wrong");
  //   }
  //
  //   console.log('Successly Added', JSON.stringify(result.ops, undefined, 2));
  // })

  db.close();
});

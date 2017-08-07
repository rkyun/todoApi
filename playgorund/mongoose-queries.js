const {ObjectID} =  require('mongodb');
const {mongoose} =  require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
const {User} =  require('./../server/models/user');

var id = "598790d14744fd23e67c9346";

if(!ObjectID.isValid(id)){
    console.log('Id is not valid');
} else{

}

// Todo.find({_id: id}).then((todos)=>{
//     if(!todos){
//         return console.log('id not find');
//     }
//     console.log(todos);
// }, (err)=>{
//     console.log(err);
// });

// Todo.findOne({_id: id}).then((todo)=>{
//     if(!todo){
//         return console.log('id not find');
//     }
//     console.log(todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('id not find');
//     }
//     console.log(todo);
// }).catch((e)=>{
//     console.log(e);
// });

User.findById(id).then((user)=>{
    if(!user){
        return console.log('id not find');
    }
    console.log(user);
}).catch((e)=>{
    console.log(e);
});
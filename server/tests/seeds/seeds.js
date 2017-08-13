const jwt = require('jsonwebtoken');

const {ObjectID} =  require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} =  require('./../../models/user.js');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'michal@gmail.com',
    password: 'user1pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
},{
    _id: userTwoId,
    email: 'ziomboi@gmail.com',
    password: 'user2pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}]; 

const todos = [{
    _id: new ObjectID(),
    text: "first test todo",
    completed: false,
    _creator: userOneId
},
{
    _id: new ObjectID(),
    text: "sec test todo",
    completed: true,
    completedAt: 123,
    _creator: userOneId
},
{
    _id: new ObjectID(),
    text: "third test todo",
    _creator: userTwoId
}];

const populateTodos = (done)=>{
    Todo.remove({}).then(()=> {
        return  Todo.insertMany(todos);
    }).then(()=> done());
};

const populateUsers = (done)=>{
    User.remove({}).then(()=> {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(()=> done());
};

module.exports= {todos, users,  populateTodos, populateUsers};
const expect = require('expect');
const request = require('supertest');
const {ObjectID} =  require('mongodb');

const {app} = require ('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: "first test todo",
    completed: false
},
{
    _id: new ObjectID(),
    text: "sec test todo",
    completed: true,
    completedAt: 123
},
{
    _id: new ObjectID(),
    text: "third test todo"
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=> {
        return  Todo.insertMany(todos);
    }).then(()=> done());
});


describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text)
            })
            .end((err, res)=>{
                if(err){
                    return done(err)
                }

                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                    
                }).catch((e) => done(e));
            })

    });
    

    it('should not create a new todo with invalid boda data', (done)=>{
        var text="";
        
        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err)
                }

                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(3)
                    done();
                }).catch((e)=>done(e));
            })
        
    });
})


describe('GET /todos', ()=>{
    it('should all todos', (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    })
});

describe('GET /todos/:id', ()=>{
    it('should return todo doc', (done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done)=>{
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect((res)=>{
                expect(res.body).toEqual({});
            })
            .end(done);
    });

    it('should return 404 if id is invalid', (done)=>{
        request(app)
            .get(`/todos/damnn`)
            .expect(404)
            .expect((res)=>{
                expect(res.body).toEqual({})
            })
            .end(done);
    });
});


describe('DELETE todos/:id', ()=>{

    it('should delete todo doc', (done)=>{
        var id = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                })
            });
    });

    it('should return 404 if ID is not found', (done)=>{
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect((res)=>{
                expect(res.body).toEqual({});
            })
            .end(done);
    });


    it('should return 400 if ID is invalid', (done)=>{
        request(app)
            .delete('/todos/damnbwoy')
            .expect(404)
            .end(done);
    });

});

describe('UPDATE todos/:id', ()=>{

    it('should update the todo', (done)=>{
        id = todos[0]._id.toHexString();

        request(app)
            .patch(`/todos/${id}`)
            .send({"completed": true})
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toNotBe(null);
            })
            .end(done);
    }); 

    it('should clean completedAt when todo is not completed', (done)=>{
        id = todos[1]._id.toHexString();

        request(app)
            .patch(`/todos/${id}`)
            .send({"completed": false})
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end(done);
    });

    it('should return 404 if ID is not found', (done)=>{
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect((res)=>{
                expect(res.body).toEqual({});
            })
            .end(done);
    });


    it('should return 400 if ID is invalid', (done)=>{
        request(app)
            .delete('/todos/damnbwoy')
            .expect(404)
            .end(done);
    });

});
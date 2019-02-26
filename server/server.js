require('./config/config');

const _ =  require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var mongodb = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {        
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);    
    });
});

app.get('/todos/:id',(req,res) => {
  var todoId = req.params.id;

  if(!mongodb.ObjectID.isValid(todoId)) {
    return res.status(404).send();
  }

  Todo.findById(todoId).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})

app.delete('/todos/:id', (req,res) => {
  var todoId = req.params.id;
   
  if(!mongodb.ObjectID.isValid(todoId)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(todoId).then ((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})

app.patch('/todos/:id', (req,res) => {
  var todoId = req.params.id;
  var body = _.pick (req.body,['text','completed']);

  if(!mongodb.ObjectID.isValid(todoId)) {
    return res.status(404).send();
  }

  if(_.isBoolean(JSON.parse(body.completed)) && JSON.parse(body.completed)){
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
    body.completed = false;
  }

  Todo.findByIdAndUpdate(todoId, {$set: body}, {new: true} , (err, todo) =>{
    if (err){
      return res.status(404).send();
    }
    res.send({todo});
  })

})

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);
  var token =  user.generateAuthToken();

  user.save().then (()=>{
    res.header('x-auth', token).send(user);  
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Started on port :${port}`);
});

module.exports = {app};

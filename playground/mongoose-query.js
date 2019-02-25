const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var todoId = '5c73414650368c735a620d07'
var userId = '5c7296639279446a360985d6'

Todo.findById(todoId).then((todo) => {
    if(!todo){
        return console.log('Todo Id not found');
    }
    console.log('Todo By id is :', todo);
})

User.findById(userId).then((user) => {
    if(!user){
        return console.log('User Id not found');
    }
    console.log('user By id is :', user);
    }, (e) => {
    console.log(e);        
})
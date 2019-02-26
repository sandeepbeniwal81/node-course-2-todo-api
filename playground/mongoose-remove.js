const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var todoId = '5c74d1b3ad0de2aa2d9495ca'
var userId = '5c7296639279446a360985d6'

// Todo.remove({}).then((result) => {
//     console.log(result);
// })

// Todo.findOneAndRemove
// Todo.findOneAndRemove({_id: todoId}).then((todo) =>{
//     console.log(todo);
// })

Todo.findByIdAndRemove(todoId).then ((todo) => {
    console.log(todo);
})

const MongoClient = require('mongodb');
const assert = require('assert');


    const url = 'mongodb://localhost:27017'
    // Use connect method to connect to the DB server
    const dbName = 'TodoApp';

    MongoClient.connect(url, (error, client) => {
    if (error) return process.exit(1)
    console.log('Connection is okay')
    const db = client.db(dbName);
    // db.collection('Todos').insertOne({
    //     text: "Somethiing to do",
    //     completed: false
    // },(err,result) =>{
    //     if(err)
    //     {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2))
    // });

    db.collection('Users').insertOne({
        name: "Sandeep Beniwal",
        age: 25,
        location: "Delhi"
    }, (err, result) => {
        if(err)
        {
            return  console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops,undefined,2))
    });
    client.close();
});




 
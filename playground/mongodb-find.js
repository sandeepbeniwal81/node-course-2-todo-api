const MongoClient =  require('mongodb')

const url = 'mongodb://localhost:27017'
// Use connect method to connect to the DB server
const dbName = 'TodoApp';

MongoClient.connect(url, (error, client) => {
    if (error) return process.exit(1)
    console.log('Connection is okay')
    const db = client.db(dbName)
    const collection = db.collection('Users');
    // collection.find().count().then((count) => {
    //     console.log(`Todos Count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to connect');
    // });
    
    ///////collection.find({_id: new MongoClient.ObjectId('5c7245e655de9663059a97ab')}).toArray((error, docs) => {
    collection.find({name: "Sandeep Beniwal"}).toArray((error, docs) => {    
        if (error) return process.exit(1)
        console.log('Users');
        console.log(JSON.stringify(docs, undefined,2));
        console.log(docs.length) 
        console.log(`Found the following documents:`)
        console.dir(docs) 
        });
    
    client.close();
});
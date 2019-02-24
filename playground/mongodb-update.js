const MongoClient =  require('mongodb')

const url = 'mongodb://localhost:27017'
// Use connect method to connect to the DB server
const dbName = 'TodoApp';

MongoClient.connect(url, (error, client) => {
    if (error) return process.exit(1)
    console.log('Connection is okay')
    const db = client.db(dbName)
    const collection = db.collection('Users');
 
    // collection.findOneAndUpdate({
    //     _id: new MongoClient.ObjectId('5c724fa73a12df63c6a797f8')
    //     },{
    //         $set:{
    //             age:30
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //     console.log(result);
    // })

    collection.findOneAndUpdate({
        _id: new MongoClient.ObjectId('5c724fa73a12df63c6a797f8')
        },{
            $set:{
                name: "Mark Christopher"
            },
            $inc:{
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
        console.log(result);
    })
    ///////collection.find({_id: new MongoClient.ObjectId('5c7245e655de9663059a97ab')}).toArray((error, docs) => {
    // collection.find({name: "Sandeep Beniwal"}).toArray((error, docs) => {    
    //     if (error) return process.exit(1)
    //     console.log('Users');
    //     //console.log(JSON.stringify(docs, undefined,2));
    //     console.log(docs.length) 
    //     console.log(`Found the following documents:`)
    //     console.dir(docs) 
    //     });
    
    client.close();
});
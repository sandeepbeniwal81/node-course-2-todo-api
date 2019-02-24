const MongoClient = require('mongodb');
const assert = require('assert');


    const url = 'mongodb://localhost:27017'
    // Use connect method to connect to the DB server
    const dbName = 'edx-course-db';

    MongoClient.connect(url, (error, client) => {
    if (error) return process.exit(1)
    console.log('Connection is okay')
    const db = client.db(dbName);
    insertDocuments(db, () => {
        console.log('insertDocuments() accessed')
        updateDocument(db, () => {
        removeDocument(db, () => {
            findDocuments(db, () => {
            client.close()
            })
        })
        })
    })
    })

    const insertDocuments = (db, callback) => {
    // Get reference to edx-course-docs collection
    const collection = db.collection(dbName)
    // Insert 3 documents
    collection.insert([
        {name : 'Bob'}, {name : 'John'}, {name : 'Peter'} // 3 documents
    ], (error, result) => {
        if (error) return process.exit(1)
        console.log(result.result.n) // will be 3
        console.log(result.ops.length) // will be 3
        console.log('Inserted 3 documents into the edx-course-students collection')
        callback(result)
    })
    }

    const updateDocument = (db, callback) => {
        // Get the edx-course-students collection
        var collection = db.collection(dbName)
        // Update document where a is 2, set b equal to 1
        const name = 'Peter'
        collection.update({ name : name }, { $set: { grade : 'A' } }, (error, result) => {
            if (error) return process.exit(1)
            console.log(result.result.n) // will be 1
            console.log(`Updated the student document where name = ${name}`)
            callback(result)
        })
    }

    const removeDocument = (db, callback) => {
        // Get the documents collection
        const collection = db.collection(dbName)
        // Insert some documents
        const name = 'Bob'
        collection.remove({ name : name }, (error, result) => {
        if (error) return process.exit(1)
        console.log(result.result.n) // will be 1
        console.log(`Removed the document where name = ${name}`)
        callback(result)
        })
    }

    const findDocuments = (db, callback) => {
        // Get the documents collection
        const collection = db.collection(dbName)
        // Find some documents
        collection.find({}).toArray((error, docs) => {
        if (error) return process.exit(1)
        console.log(2, docs.length) // will be 2 because we removed one document
        console.log(`Found the following documents:`)
        console.dir(docs)
        callback(docs)
        })
    }



 
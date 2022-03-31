const express = require('express')
const res = require('express/lib/response');
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb')
const cors = require('cors');

//const { MongoClient, ServerApiVersion } = require('mongodb');


const connectionString = 'mongodb+srv://crud_tuto:crud_tuto@cluster0.6nvil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
function getDatabase(){
    return MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then((client) => {
        const db = client.db('Angular10Crud')
        return db;
    })
}

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static('public'));
app.use(bodyParser.json());

app
.post('/api/tutorials', function(req, res){
    getDatabase()
    .then((database)=>{
        console.log(req.body)
        /* */
        const tutorialCollection = database.collection('tutorial')
        return tutorialCollection
        .insertOne(req.body)
        .then((result)=>{
            res.json({ status: 'SUCCESS', message: 'Tutorial Created', result: result})
        })
        .catch((error)=>{
            res.json({ status: 'ERROR', message: error.message})
        })
        /* */
    })
})
.get('/api/tutorials', function(req, res){
    getDatabase()
    .then((database)=>{
        const tutorialCollection = database.collection('tutorial')
        return tutorialCollection
        .find()
        .toArray()
        .then((result)=>{
            res.json({status: 'SUCCESS', data: result})
        })
    })
    .catch((error)=>{
        res.json({status: 'ERROR', message: error.message})
    })
})
.get('api/tutorials/:id', function(req, res){
    getDatabase()
    .then((database)=>{
        const id = req.params.id;
        var tutorialCollection = database.collection('tutorial');
        var resp = tutorialCollection.findOne({
            _id : id
        });
        return resp;
    })
})

const port = 3000
app.listen(port, function (){
    console.log(`Listening on port ${port}`); 
})
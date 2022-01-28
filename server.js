//importing expressjs

const express = require('express')


//body parse for getting the data through the url
const bodyparse = require('body-parser')

//importing mongoclient
const MongoClient=require('mongodb').MongoClient 
const req = require('express/lib/request')
//creating app function from express functional constructor to use it for creating 
//server and api
const app = express()

//Enabling body parsel with urlencoded from the data
app.use(bodyparse.urlencoded({extended:true}))

//impoting 

const connectionString="mongodb+srv://nagendra:N12345678@cluster0.5f5gy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//connecting the database

MongoClient.connect(connectionString,{useunifiedtopology:true})
.then(client =>{
    console.log('connected to datbase server')
    const db=client.db('star-wars-quotes')
    const  quotesCollection = db.collection('quotes')
    
    
    //Two parametersfirst one route,second one is function
        app.post('/quotes',(req,res)=>{
            quotesCollection.insertOne(req.body)
            .then(result=>{
                res.send(result)
            })
            .catch(error=>console.error(error))
})

// 2. Reading data from MongoDB

app.get('/getall',(req,res)=>{

    // Finding the collection quotes and changing object of objects to array of objects

     db.collection('quotes').find().toArray()
     // Waiting for the promise to send us the result back
    .then(result=>{
      res.send(result)
    })
    // Waiting for the promise to send us the error back

    .catch(error=>console.error(error))
})
app.put('updatequote',(req,res)=>{

    quotesCollection.findOneAndUpdate()

    //waiting for the promise to send us the result

    .then(result=>{

        res.send(result)

    })
    .catch(error=>console.error(error))
})

}).catch(console.error) // MongoDB Atlas Cluster/Server Connection Erro
//Creating the server
app.get('/',(req,res) =>{

    res.sendFile(__dirname + '/index.html') 
})

const PORT = 5004

app.listen(PORT, () => {

    console.log(`Server is Running on port ${PORT}`)

})

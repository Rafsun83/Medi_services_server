const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const port = 5000
const cors = require('cors')
const fileUpload = require("express-fileupload")
// const pass = 'hSydc5gu0dJnGikM'
app.use(cors())
app.use(express.json())
app.use(fileUpload())







const uri = "mongodb+srv://Medi_Services:hSydc5gu0dJnGikM@cluster0.u5ucb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("connect database")
        const database = client.db("Medi_Services")
        const PostCollection = database.collection("UserPost")

        //Post API //user post store in database
        app.post('/UserPost', async (req, res) => {
            const status = req.body.status
            const pic = req.files.image
            const picData = pic.data
            const encodedpic = picData.toString('base64')
            const imageBuffer = Buffer.from(encodedpic, 'base64')

            const User = {
                status,
                image: imageBuffer
            }


            const result = await PostCollection.insertOne(User)
            res.send(result)
        })

        //user post get api
        app.get('/UserPost', async (req, res) => {
            const cursor = PostCollection.find({})
            const Users = await cursor.toArray()
            res.json(Users)
        })





    } finally {
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello Mediservices')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
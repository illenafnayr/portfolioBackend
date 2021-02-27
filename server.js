//Dependencies
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Email = require('./models/emails.js');
const cors = require("cors");


// Config
const app = express()
dotenv.config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const corsOptions = {
    origin: "http://localhost:8080"
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static('public'))

// Controllers
// const Controller = require('./controllers/_controller.js')
// app.use('/', Controller)

app.get('/', (req, res)=>{
  res.send('welcome my friend, nothing for you to see here')
})

app.post('/', (req, res) => {
    Email.create(req.body, (err, data)=>{
        res.json(data)
    })
})


//Database Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
// DB connection test
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// Listening
app.listen(PORT, ()=>{
    console.log('we get requests, port: ', PORT)
})
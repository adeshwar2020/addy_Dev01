const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const router = require('./routes/route')
const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(morgan('dev'))
// app.use('/api', require('./api/routes.js'));
// app.use('/auth', require('./api/auth.js'));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(router)
app.use(express.static('.'));

const port = 3000
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    // res.status(200).send({'message':'success'});
});

app.listen(process.env.PORT || port, (err) => {
    if (err)
        console.log('Unable to start the server!')
    else
        console.log('Server started running on : ' + port)
})
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const http = require('http').Server(app);
const cors = require("cors");
const io = require('socket.io')(http ,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(function(req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/message', (req, res) => {
 const {message} = req.body
    io.emit('message', message);
 })

const server = http.listen(8000, () => {
  console.log('server is running on port', server.address().port);
});
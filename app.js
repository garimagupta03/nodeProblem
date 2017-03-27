var express = require('express')
const fileUpload = require('express-fileupload');
var app = express()

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/view/index.html')
})

app.use(fileUpload());

var eventsController = require(__dirname + '/controller/eventsController.js');

app.post('/upload', eventsController);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


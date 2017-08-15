var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.listen(port, function() {
  console.log('Server start, listening on port ' + port);
});

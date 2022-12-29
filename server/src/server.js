const https = require('https');
const http = require('http');

const fs = require('fs');
var express = require('express');
var app = express();

const db = require("./models");

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000"
  // origin:"http://34.134.26.155"
};
app.use(cors());

db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true })
  .then(()=>{
    console.log('Connected to the database!');
  })
  .catch( err =>{
    console.log("Cannot connect to the database!", err);
    process.exit();
  })
  ;

app.get('/', (req, res) => {
  var data = '<p>Vagrant up!</p>';
  if (db.mongoose.connection.readyState) {
    data += '<p>Connected to MongoDB!</p>';
  } else {
    data += '<p>Not connected to MongoDB :(</p>';
  }
  res.send(data);
});
require("./routers/bos311.routes")(app)
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
// const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/infodeserts.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/infodeserts.org/fullchain.pem'),
}, app);
httpsServer.listen(port, () => {
  console.log('Listening on port' + port);
});
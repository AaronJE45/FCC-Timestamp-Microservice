// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  let dataObject;

  // Cheaking if a date is given or not
  if (!date) {
    dataObject = new Date();
  } else {
    // Checking if it is UNIX/String date
    if (!isNaN(date)) {
      dataObject = new Date(parseInt(date));  
    } else {
      dataObject = new Date(date);  
    }
  }

  if (dataObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: dataObject.getTime(),
    utc: dataObject.toUTCString()
  });
});
  



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

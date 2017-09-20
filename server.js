const express = require('express'),
    app = express();

const port = 3001;

app.use(express.static('public'));

app.listen(port, function() {
  console.log("auth frontend running on port: ", port);
});

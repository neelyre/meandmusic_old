const express         = require('express');
// const lodash          = require('lodash');
const app             = express();
const PORT            = process.env.PORT || 3001

app.use(express.static('public'));

app.listen(PORT, ()=>console.log('music app listening on port', PORT));

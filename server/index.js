const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../dist/local')));

app.listen(6001, function () {
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:6001 in your browser.');
});

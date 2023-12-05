const express = require('express');
//The program search the index automatically
const routerApi = require('./routes');

const app = express();
const port = 8080;

//Allow to receive json information
app.use(express.json());

routerApi(app);

app.get('/', (req, res) => {
  res.send('Hello my server express');
});

app.listen(port, () => {
  console.log('Running in port' + port);
});

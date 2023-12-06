const express = require('express');
const cors = require('cors');
//The program search the index automatically
const routerApi = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

//Allow to receive json information
app.use(express.json());

const whitelist = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://xpand-service-storage.onrender.com/',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  },
};
//Allow all domains with cors()
app.use(cors(options));

routerApi(app);

app.get('/', (req, res) => {
  res.send('Hello my server express');
});

app.listen(port, () => {
  console.log('Running in port' + port);
});

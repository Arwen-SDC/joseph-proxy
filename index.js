require('newrelic');

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3100;
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.json());
app.use('/games/:id', express.static(`${__dirname}/public`));

app.get('/cartapi/:gameId', (req, res) => {
  axios({
    baseURL: `http://ec2-13-59-39-155.us-east-2.compute.amazonaws.com:3001/cartapi/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.get('/api/games/:gameId', (req, res) => {
  axios({
    baseURL: `http://54.67.69.54:3004/api/games/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.get('/reviews/:gameId', (req, res) => {
  axios({

    baseURL: `http://18.220.38.54:3002/reviews/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.post('/addGame/:id', (req, res) => {
  const newGame = {'csgo': "silver4"};
  res.send(newGame);

});

app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});
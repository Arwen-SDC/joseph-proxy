require('newrelic');

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3100;
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.json());
app.use('/games/:id', express.static(`${__dirname}/public`));

app.get('/cartapi/:id', (req, res) => {
  axios({
    baseURL: `http://localhost:3001/cartapi/${req.params.id}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.post('/addGame/:id', (req, res) => {
  res.send(200);
});

// app.use('/cartapi/:id', createProxyMiddleware({target: 'localhost:3001', changeOrigin: true}));
// app.use('/addGame/:id', createProxyMiddleware({target: 'localhost:3001', changeOrigin: true}));


app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});
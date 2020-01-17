const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const http = require('http');

const server = http.Server(app);

const {setupWebSocket} = require('./websocket')
requireDir('./src/model')

const routes = require('./src/routes')
setupWebSocket(server);


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/devradar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(routes)

server.listen(3333);

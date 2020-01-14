const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

requireDir('./src/model')

const routes = require('./src/routes')



app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/devradar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(routes)

app.listen(3333);

require('dotenv').config();
const express = require('express');
// const morgan = require('morgan'); // Removed morgan to decrease time to GET
const cors = require('cors');
const path = require('path');
const productRouter = require('./routes.js');

const app = express();

app.use(cors());
// app.use(morgan('dev')); // Removed morgan to decrease time to GET
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(productRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = app;

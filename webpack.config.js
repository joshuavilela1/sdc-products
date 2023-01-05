const path = require('path');
require('dotenv').config();

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js"
  },


}
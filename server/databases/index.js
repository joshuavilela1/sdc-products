const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  database: 'sdc_products'
})

client.connect();


module.exports = {

  getProductsDB: (cb) => {

  }

}
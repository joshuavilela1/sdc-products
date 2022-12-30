const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'sdc_products'
});

module.exports = {

  getProductsDB: (cb) => {
    pool.query(`SELECT * FROM products LIMIT`)
  },

  getProductInfoDB: (product_id, cb) => {

  },

  getStylesDB: (product_id, cb) => {

  },

  getRelatedDB: (product_id, cb) => {
    pool.query(`SELECT related_product_id FROM related WHERE current_product_id = ${product_id}`)
      .then(({rows}) => cb(null, rows.map((row) => {
        return row.related_product_id;
      })))
      .catch((err) => cb(err));
  }

}
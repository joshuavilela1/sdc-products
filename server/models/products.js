require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// pool.connect();

module.exports = {
  getProductsDB: (page, count, cb) => {
    // needs to be in correct page with count values
    pool
      .query(
        `SELECT * FROM products WHERE id > ${(page - 1) * count} AND id < ${
          page * count + 1
        }`,
      )
      .then(({ rows }) => cb(null, rows))
      .catch((err) => cb(err));
  },

  getProductInfoDB: (product_id, cb) => {
    pool
      .query(
        `SELECT *, (SELECT jsonb_agg(features) FROM (SELECT feature, value FROM features WHERE
      product_id = ${product_id}) features) AS features FROM products WHERE id = ${product_id}`,
      )
      .then(({ rows }) => cb(null, rows[0]))
      .catch((err) => cb(err));
  },

  getStylesDB: (product_id, cb) => {
    pool
      .query(
        `SELECT id AS product_id,
    (SELECT jsonb_agg(results) AS results FROM (SELECT id as style_id, name, original_price, sale_price, default_style AS "default?",
    (SELECT jsonb_agg(photos) AS photos FROM (SELECT thumbnail_url, url FROM photos WHERE styleId = styles.id) photos),
    (SELECT json_object_agg(id, (json_build_object('quantity', quantity, 'size', size))) AS skus FROM skus WHERE styleId = styles.id)
    FROM styles WHERE product_id = ${product_id}) results)
    FROM products WHERE id = ${product_id}`,
      )
      .then(({ rows }) => cb(null, rows[0]))
      .catch((err) => cb(err));
  },

  getRelatedDB: (product_id, cb) => {
    pool
      .query(
        `SELECT related_product_id FROM related WHERE current_product_id = ${product_id}`,
      )
      .then(({ rows }) =>
        cb(
          null,
          rows.map((row) => row.related_product_id),
        ),
      )
      .catch((err) => cb(err));
  },
};

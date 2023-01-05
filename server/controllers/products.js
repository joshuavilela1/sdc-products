const {
  products: { getProductsDB, getProductInfoDB, getStylesDB, getRelatedDB },
} = require('../models');

module.exports = {
  getProducts: (req, res) => {
    //need page and count and default amounts
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    getProductsDB(page, count, (err, results) => {
      if (!err) {
        res.send(results).status(200);
      } else {
        res.send(err).status(500);
      }
    });
  },

  getProductInfo: (req, res) => {
    getProductInfoDB(req.params.product_id, (err, results) => {
      if (!err) {
        res.send(results).status(200);
      } else {
        res.send(err).status(500);
      }
    });
  },

  getStyles: (req, res) => {
    getStylesDB(req.params.product_id, (err, results) => {
      if (!err) {
        res.send(results).status(200);
      } else {
        res.send(err).status(500);
      }
    });
  },

  getRelated: (req, res) => {
    getRelatedDB(req.params.product_id, (err, results) => {
      if (!err) {
        res.send(results).status(200);
      } else {
        res.send(err).status(500);
      }
    });
  },
};

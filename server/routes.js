require('dotenv').config;
const productRouter = require('express').Router();
const {
  products: { getProducts, getProductInfo, getStyles, getRelated },
} = require('./controllers');

productRouter.get('/products/:product_id', getProductInfo);
productRouter.get('/products/:product_id/related', getRelated);
productRouter.get('/products/:product_id/styles', getStyles);
productRouter.get('/products', getProducts);
productRouter.get(`/${process.env.L_TOKEN}`, (req, res) => {
  res.send(`${process.env.L_TOKEN}`);
});

module.exports = productRouter;

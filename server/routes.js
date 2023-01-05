const productRouter = require('express').Router();
const {
  products: { getProducts, getProductInfo, getStyles, getRelated },
} = require('./controllers');

productRouter.get('/products/:product_id', getProductInfo);
productRouter.get('/products/:product_id/related', getRelated);
productRouter.get('/products/:product_id/styles', getStyles);
productRouter.get('/products', getProducts);

module.exports = productRouter;

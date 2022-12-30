const productRouter = require('express').Router();
const {
  products: {getProducts, getProductInfo, getStyles, getRelated}
} = require('./controllers');

productRouter.get('/products:page?:count?', getProducts);
productRouter.get('/products/:product_id', getProductInfo);
productRouter.get('/products/:product_id/styles', getStyles);
productRouter.get('/products/:product_id/related', getRelated);

module.exports = productRouter;
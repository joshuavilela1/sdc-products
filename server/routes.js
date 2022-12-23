const productRouter = require('express').Router();
const {getProducts, getProductInfo, getStyles, getRelated} = require('./controllers/products.js')

productRouter.get('/products', getProducts);
productRouter.get('/products/:product_id', getProductInfo);
productRouter.get('/products/:product_id/styles', getStyles);
productRouter.get('/products/:product_id/related', getRelated);

module.exports = productRouter;
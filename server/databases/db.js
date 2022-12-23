require('dotenv').config();
const {mongoose, Schema} = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const productSchema = new Schema(
  {
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: {
    feature: String,
    value: String
  }
  },
{ timestamps: true }
)

const relatedSchema = new Schema(
  {
  product_id: Number,
  related: [Number]
  }
)

const styleSchema = new Schema(
  {
    product_id: Number,
    results: [
      {
        style_id: Number,
        name: String,
        original_price: String,
        sale_price: String,
        default: {type: Boolean, default: false},
        photos: [
          {
            thumbnail_url: String,
            url: String
          }
        ],
        skus: {
          sku: {
            quantity: Number,
            size: String
          }
        }
      }
    ]
  }
)

const Product = new mongoose.model('product', productSchema);
const Style = new mongoose.model('style', styleSchema);
const Related = new mongoose.model('related', relatedSchema);

module.exports = {Product, Style, Related};

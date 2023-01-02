const request = require('supertest');
const app = require('../server/index');

describe("GET /products", () => {
  it("should give a 200 status code", async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toEqual(200);
  });

  it("should return 10 products when count is assigned 10", async () => {
    const response = await request(app).get('/products?count=10');
    expect(response.body.length).toEqual(10);
  });

  it("should give 5 products when no count is given", async () => {
    const response = await request(app).get('/products');
    expect(response.body.length).toEqual(5);
  });

  it("should have these properties: id, name, slogan, description, category, default_price", async () => {
    const response = await request(app).get('/products');
    expect(response.body[0].hasOwnProperty('id')).toEqual(true);
    expect(response.body[0].hasOwnProperty('name')).toEqual(true);
    expect(response.body[0].hasOwnProperty('slogan')).toEqual(true);
    expect(response.body[0].hasOwnProperty('description')).toEqual(true);
    expect(response.body[0].hasOwnProperty('category')).toEqual(true);
    expect(response.body[0].hasOwnProperty('default_price')).toEqual(true);
  });

  it("should give different products depending on the page selected ", async () => {
    const response = await request(app).get('/products?page=1');
    const response2 = await request(app).get('/products?page=2');
    expect(response.body[0]).not.toEqual(response2.body[0]);
  });

});

describe("GET /products/:product_id", () => {
  it("should give a 200 status code", async () => {
    const response = await request(app).get('/products/10');
    expect(response.statusCode).toEqual(200);
  });

  it("should show product with the id of 10", async () => {
    const response = await request(app).get('/products/10');
    expect(response.body.id).toEqual(10);
  });

  it("should have a features property", async () => {
    const response = await request(app).get('/products/10');
    expect(response.body.hasOwnProperty('features')).toEqual(true);
  });
});

describe("GET /products/:product_id/styles", () => {
  it("should give a 200 status code", async () => {
    const response = await request(app).get('/products/10/styles');
    expect(response.statusCode).toEqual(200);
  });

  it("should have a results property", async () => {
    const response = await request(app).get('/products/10/styles');
    expect(response.body.hasOwnProperty('results')).toEqual(true);
  });

  it("should show styles for the product with id 10", async () => {
    const response = await request(app).get('/products/10/styles');
    expect(response.body.product_id).toEqual(10);
  });

  it("should have these properties: style_id, name, original_price, sale_prce, default?, photos, skus", async () => {
    const response = await request(app).get('/products/10/styles');
    expect(response.body.results[0].hasOwnProperty('style_id')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('name')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('original_price')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('default?')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('photos')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('skus')).toEqual(true);
  });
});

describe("GET /products/:product_id/related", () => {
  it("should give a 200 status code", async () => {
    const response = await request(app).get('/products/10/related');
    expect(response.statusCode).toEqual(200);
  });

  it("should show array of related product id's", async () => {
    const response = await request(app).get('/products/10/related');
    expect(Array.isArray(response.body)).toEqual(true);
  });
});
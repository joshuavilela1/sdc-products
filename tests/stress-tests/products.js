import http from "k6/http";
import { check, sleep } from "k6";
const autocannon = require('autocannon');

// export const options = {

// };

// export default () => {

// };

async function stressTest() => {
  const result = await autocannon({
    url: 'http://localhost:3000/products',
    connections: 10,
    pipelining: 1,
    duration: 15
  });

  console.log(result);
}
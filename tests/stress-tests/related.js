import http from "k6/http";
import { check, sleep } from "k6";
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { Counter } from 'k6/metrics';

const ErrorCount = new Counter('errors');

// 1k RPS each route
// Measure RPS, Latency, and Error Rate for each request.

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 times per second (1000 RPS)
      duration: '25s',
      preAllocatedVUs: 500, // start with this amount of virtual users
      maxVUs: 1050 // Max amount of VU's in case allocated is not enough
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], //Error shoud be be below 1%
    http_req_duration: ['p(99) < 50'] // response should be < 50ms
  }
};

export default function testProducts() {
  let randomProduct = randomIntBetween(1, 1000011);

  const response = http.get(`http://localhost:3000/products/${randomProduct}/related`);
  const success = check(response, {
    'status is 200': (r) => r.status === 200,
  });
  if (!success) {
    ErrorCount.add(1);
  }
  sleep(1);
};
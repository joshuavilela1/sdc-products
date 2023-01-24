# Atelier Overview Service
The Atelier Overview service supports the products section of the [Atelier product page](https://github.com/fec9-wendys/Project-Atelier)
![](https://gyazo.com/5496fab292d5e6a0383ce925d24e4a6d.gif)

## Overview
### Tech Stack
![](https://camo.githubusercontent.com/aeddc848275a1ffce386dc81c04541654ca07b2c43bbb8ad251085c962672aea/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d2532333332333333302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145)
![](https://camo.githubusercontent.com/dfc69d704694f22168bea3d84584663777fa5301dcad5bbcb5459b336da8d554/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533443f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)
![](https://camo.githubusercontent.com/7f73136d92799b19be179d1ed87b461120c35ed917c7d5ab59a7606209da7bd3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732e6a732d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d7768697465)
![](https://camo.githubusercontent.com/9281daa5684971fd3325661e3dd5fea86b21a902e3741a556fb636fbf0e2f3d4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4157532d2532334646393930302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d616d617a6f6e2d617773266c6f676f436f6c6f723d7768697465)

Product Page: Joshua Vilela

[![](https://camo.githubusercontent.com/7e1a1a039c75a7c4d2a91d7f97bf0a1c2adcf7cb49b7dbbfc02963a4f9fdaca4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2d2532333030373742352e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465)](https://www.linkedin.com/in/joshuavilela)
[![](https://camo.githubusercontent.com/f6d50128cb007f85916b7a899da5d94f654dce35a37331c8d28573aef46f4274/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465)](https://github.com/joshuavilela1)

Atelier's Overview page is supported with 5 AWS EC2 instances:
- 1 Postgres Database
- 1 NGINX Load Balancer
- 3 identical Host Servers

With an expectation of a 1000RPS with <1% error rate and <2000ms response time, the above system can handle 10000 RPS with an average response time of 15 ms and .7% error rate.

## Planning and Considerations
### Postgres
Postgres was chosen for its versatility with large and complex datasets as well as allows for data validation which eliminate errors due to incorrect data input. Postgres was also used for its built-in caching which would lead to faster response times for repeated visits to that product page for the users.

### ETL Process
Over 2,160 MB of data was processed to the database using Postgres's feature to copy from csv files allowing easy transfer of data to the database.

### Schema Design 
The Products Database is complex and composes of seven tables consisting of a:
- Products
- Features
- Styles
- Photos
- Skus
- Related

These tables allow us to grab the necessary data needed for the product page of Project Atelier. Original schema designs used a noSQL database, but after further investigation having a SQL design would be a better approach as having a relational database is beneficial for the data that was given.

## Performance Optimizations

### Removing Nested Queries
- The first thing I did to improve the performance of the server was to reduce the use of nested queries as that would allow for more asynchronous events to occur which would result in slower response times and would start to add up with more requests being received bt the system.
- However a tradeoff to this optimization is that the query would be very complex to extract the data without the need of additional queries but this allows for faster data retrieval time when executed.

### Local Testing
- Before optimizing queries, trying to pull specific data from the tables would be far too slow. Doing simple requets on Postman displayed response times of 15 seconds. However after updating the queries, average response time was about 7 seconds which is still far from the target goal.
- After indexing fields on commonly retrieved data the response times improved dramatically going from around 7 seconds to around 20-40ms per request

![](https://gyazo.com/5cb549bc354debfef025089ec66d6a18.png)

Using K6, I conducted random load testing on the styles routes showing an average response time of 22.52ms at 1000 requests per second

![](https://gyazo.com/26b9bc4a337857371cd7372f2b769eb5.png)

I also did random load testing on `products` and `products_id` and saw similar results at 1000 RPS

![](https://gyazo.com/41ab65cb765b83a98b60e7e9b4d84b9f.png)
![](https://gyazo.com/786c6212a8ed4da9ab1a72d3b1a6d5a2.png)

This meets the expectations of our server being able to handle 1,000 RPS with a response time of less than <2,000 ms, but I wanted to see how much further we can push the system so I started to explore load balancing server instances.

## Deployment & Load Balancing
After deploying both my database and server instance onto AWS EC2 instances, I started doing stress testing using [loader.io](https://loader.io) and at 1000 RPS, the average response times was around 544ms with a 0% error rate on one server instance.

![](https://gyazo.com/4b449fc9622da72aa9e3990d4b8ba685.png)

In order to acquire faster response times while also being able to handle more requests, I implemented a NGINX load balancer and deployed to AWS to distribute requests in a round-robin approach. 

After the creation of a load balancer, I managed to add an addition 3 servers to the system. 

The second server saw drastic improvements in both response times and its ability to handle more requests. At 1,000/3,000/5,000 RPS, the average response times was around 12 ms for all three and for 10,000 RPS (max requests on loader.io) it was an average of 17 ms
![](https://gyazo.com/d5101f8a783258335dbbc313cfb14fb4.png)
![](https://gyazo.com/89a8947250bb0d45cbe72d27cbf9af4b.png)
![]()

After further testing, the third and fourth server instance did not reduce the response time by much for 10,000 RPS as it maintained around 15ms for these requests with 0% error rate.
![](https://gyazo.com/81f5303afcd75fa4ec45443387b3e1f7.png)
![]()

Seeing these results, I decided to maintain only three server instances as it provided the perfect balance of stability and performance to maintain 10,000 RPS with an average response time of 15ms.

## Further Improvements
For further improvements, I would like to test different geographical areas to see what the response times would be for other regions.

Another improvement I would like to do in the future would be to rework the design of the schema to reduce the amount of tables used in this design.

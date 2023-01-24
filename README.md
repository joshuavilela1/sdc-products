# Atelier Overview Service

The Atelier Overview service supports the products section of the [Atelier product page](https://github.com/fec9-wendys/Project-Atelier)
![](https://gyazo.com/5496fab292d5e6a0383ce925d24e4a6d.gif)

## Overview

### Tech Stack

![](https://camo.githubusercontent.com/aeddc848275a1ffce386dc81c04541654ca07b2c43bbb8ad251085c962672aea/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d2532333332333333302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145)
![](https://camo.githubusercontent.com/dfc69d704694f22168bea3d84584663777fa5301dcad5bbcb5459b336da8d554/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533443f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)
![](https://camo.githubusercontent.com/7f73136d92799b19be179d1ed87b461120c35ed917c7d5ab59a7606209da7bd3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732e6a732d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d7768697465)
![](https://camo.githubusercontent.com/9281daa5684971fd3325661e3dd5fea86b21a902e3741a556fb636fbf0e2f3d4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4157532d2532334646393930302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d616d617a6f6e2d617773266c6f676f436f6c6f723d7768697465)

Atelier's Overview page is supported with 5 AWS EC2 instances:

- 1 Postgres Database
- 1 NGINX Load Balancer
- 3 identical Host Servers

With an expectation of a 1000RPS with <1% error rate and <2000ms response time, the above system can handle 10000 RPS with an average response time of 15 ms and .7% error rate.

## Planning and Considerations

### Postgres

Postgres was chosen for its versatility with large and complex datasets as well as allows for data validation which eliminate errors due to incorrect data input. Postgres was also used for its built-in caching which would lead to faster response times for repeated visits to that product page for the users.

### ETL Process

Data was processed to the database using Postgres's feature to copy from csv files allowing easy transfer of data to the database.

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

The first thing I did to improve the performance of the server was to reduce the use of nested queries as that would allow for more asynchronous events to occur which would result in slower response times and would add up as the RPS would increase for the system

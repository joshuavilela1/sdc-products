DROP DATABASE IF EXISTS sdc_products;

CREATE DATABASE sdc_products;

DROP TABLE IF EXISTS Products CASCADE;
DROP TABLE IF EXISTS Features CASCADE;
DROP TABLE IF EXISTS Styles CASCADE;
DROP TABLE IF EXISTS Skus CASCADE;
DROP TABLE IF EXISTS Photos CASCADE;
DROP TABLE IF EXISTS Related CASCADE;

-- \i ‘file path’ run sql files
-- \copy  copy from csv files

CREATE TABLE Products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price TEXT NOT NULL

);

CREATE TABLE Features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES Products(id),
  feature TEXT NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE Styles (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES Products(id),
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT NOT NULL,
  default_style BOOLEAN NOT NULL
);

CREATE TABLE Photos (
  id SERIAL PRIMARY KEY,
  styleId INTEGER REFERENCES Styles(id),
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);

CREATE TABLE Skus(
  id SERIAL PRIMARY KEY,
  styleId INTEGER REFERENCES Styles(id),
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL
);

CREATE TABLE Related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER REFERENCES Products(id),
  related_product_id INTEGER NOT NULL
);

-- LOAD csv files
\COPY Products FROM './CSV/product.csv' DELIMITER ',' CSV HEADER;
\COPY Features FROM './CSV/features.csv' DELIMITER ',' CSV HEADER;
\COPY Styles FROM './CSV/styles.csv' DELIMITER ',' CSV HEADER;
\COPY Photos FROM './CSV/photos.csv' DELIMITER ',' CSV HEADER;
\COPY Skus FROM './CSV/skus.csv' DELIMITER ',' CSV HEADER;
\COPY Related FROM './CSV/related.csv' DELIMITER ',' CSV HEADER;

-- Create Indices for each foreign key for quicker data retrieval

CREATE INDEX features_pid on features(product_id);
CREATE INDEX styles_pid on styles(product_id);
CREATE INDEX photos_sid on photos(styleId);
CREATE INDEX skus_sid on skus(styleId);
CREATE INDEX related_pid on related(current_product_id);












CREATE TABLE products(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
description VARCHAR(255), 
price NUMERIC(7,2) NOT NULL, 
category VARCHAR(100) NOT NULL
);
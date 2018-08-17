CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	PRIMARY KEY (item_id),
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(3,2) NULL,
    stock_quantity INTEGER NULL
);

SELECT * FROM products
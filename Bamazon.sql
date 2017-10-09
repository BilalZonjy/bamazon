Drop database if exists Bamazon;

CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Defy Evolv shoes', 'Shoes', 79.99, 500),
		('Raver ClimbX ', 'Shoes', 49.99, 200),
		('Bandit Evolv', 'Shoes', 60.99, 300),
		('Finale LaSportiva', 'Shoes', 119.99, 400),
		('Agro Evolv', 'Shoes', 169.99, 100),
		('Edelweiss', 'Rope', 99.99, 100),
		('Mammut Infinity Classic ', 'Rope', 179.99, 150),
		('Petzl Volta Dry', 'Rope', 279.99, 200),
		('Black Diamond FreeWire', 'Quickdraw', 13.95, 2000),
		('Petzl Spirit Express 17cm', 'Quickdraw', 22.95, 600),
		('Black Diamond Rocklock', 'Carabiner', 10.50, 423),
		('Black Diamond Neutrino', 'Carabiner', 5.99, 150);

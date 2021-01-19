-- Datbase
CREATE DATABASE tododb;

-- Tables
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(200),
    user_id integer FOREIGN KEY,
    title VARCHAR(50),
    priority integer,
    state integer,
    date date
);
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(20)
);

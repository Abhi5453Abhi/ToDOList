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

-- Indexing For Faster Searching and Deletions
CREATE INDEX title_index on todo("title");
CREATE INDEX todo_index on todo("todo_id");
CREATE INDEX user_index on todo("user_id");
-- Multi-Index for Updations
CREATE INDEX user_todo_index on todo("user_id","todo_id");

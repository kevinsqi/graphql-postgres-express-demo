DROP DATABASE IF EXISTS graphql_postgres_express_demo;
CREATE DATABASE graphql_postgres_express_demo;

\c graphql_postgres_express_demo;

CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  title      TEXT
);

INSERT INTO posts (title)
  VALUES ('One easy trick to learn graphql');

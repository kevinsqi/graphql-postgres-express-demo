DROP DATABASE IF EXISTS graphql_postgres_express_demo;
CREATE DATABASE graphql_postgres_express_demo;

\c graphql_postgres_express_demo;

CREATE TABLE posts (
  id         INTEGER PRIMARY KEY,
  title      TEXT
);

CREATE TABLE comments (
  id         SERIAL PRIMARY KEY,
  post_id    INTEGER,
  user_id    INTEGER,
  text       TEXT
);

CREATE TABLE users (
  id         INTEGER PRIMARY KEY,
  username   TEXT
);

INSERT INTO users (id, username)
  VALUES (1, 'heisenberg'),
         (2, 'kelvin'),
         (3, 'frog man');

INSERT INTO posts (id, title)
  VALUES (1, 'One easy trick to learn graphql'),
         (2, '10 ways to shock your friends with ReactJS');

INSERT INTO comments (post_id, user_id, text)
  VALUES (1, 3, 'are you the illuminati'),
         (1, 2, 'you have been coaxed into a snafu'),
         (1, 3, 'is this web scale?'),
         (2, 1, 'pranked by the tricky trickster'),
         (2, 2, 'you just got tricked!');

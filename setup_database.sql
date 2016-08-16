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
  text       TEXT
);

INSERT INTO posts (id, title)
  VALUES (1, 'One easy trick to learn graphql'),
         (2, '10 ways to shock your friends with ReactJS');

INSERT INTO comments (post_id, text)
  VALUES (1, 'are you the illuminati'),
         (1, 'you have been coaxed into a snafu'),
         (1, 'is this web scale?'),
         (2, 'pranked by the tricky trickster'),
         (2, 'you just got tricked!');

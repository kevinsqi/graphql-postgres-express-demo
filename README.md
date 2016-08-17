# GraphQL Postgres Express demo

## Setup

Install and use node 6 (if it's not already installed):

```
nvm install 6
nvm use 6
```

Install packages:

```
npm install
```


Set up the database (requires postgres to be installed):

```
psql -f setup_database.sql
```

## Running the app

```
npm run start
```

Then, go to [localhost:3000](http://localhost:3000/).

Here's a sample query you can try out:

```
{
  post(id: 1) {
    id
    title
  }
  posts {
    id
    title
    comments(limit: 2) {
      id
      text
      user {
        username
      }
    }
  }
}
```

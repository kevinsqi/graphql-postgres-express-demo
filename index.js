// require express
const express = require('express');
const app = express();

// require graphql
const {
  graphql,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
const graphqlHTTP = require('express-graphql');

// require postgres
const pg = require('pg');
const pgpool = new pg.Pool({ database: 'graphql_postgres_express_demo' });

// set up schema
const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      post: {
        type: postType,
        resolve: () => {
          return pgpool.query(`
            SELECT * FROM posts
            WHERE id = 1
          `, []).then((result) => result.rows[0]);
        }
      },
    },
  }),
});

// set up express
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log('express is running...');
});

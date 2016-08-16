// require express
const express = require('express');
const app = express();

// require graphql
const {
  graphql,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
const graphqlHTTP = require('express-graphql');

// require postgres
const pg = require('pg');
const pgpool = new pg.Pool({ database: 'graphql_postgres_express_demo' });

// set up schema
const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {
      type: GraphQLID
    },
    post_id: {
      type: GraphQLInt
    },
    text: {
      type: GraphQLString
    }
  }
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    comments: {
      type: new GraphQLList(commentType),
      resolve: (obj) => {
        console.log(obj);
        return pgpool.query(`
          SELECT * FROM comments
          WHERE post_id = $1
        `, [obj.id]).then((result) => result.rows);
      }
    },
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      post: {
        type: postType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (obj, args) => {
          return pgpool.query(`
            SELECT * FROM posts
            WHERE id = $1
          `, [args.id]).then((result) => result.rows[0]);
        }
      },
      posts: {
        type: new GraphQLList(postType),
        resolve: () => {
          return pgpool.query(`
            SELECT * FROM posts
          `, []).then((result) => result.rows);
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

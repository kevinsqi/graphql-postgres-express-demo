// require express
const express = require('express');
const app = express();

// require graphql
const {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');
const graphqlHTTP = require('express-graphql');

// set up schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      }
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

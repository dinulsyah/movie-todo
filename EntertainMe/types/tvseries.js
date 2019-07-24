const gql = require('graphql')

const tvSeriesSchema = new gql.GraphQLObjectType({
    name: 'TvSeries',
    fields: {
      _id: { type: gql.GraphQLID },
      title: { type: gql.GraphQLString },
      overview: { type: gql.GraphQLString },
      poster_path: { type: gql.GraphQLString },
      popularity: { type: gql.GraphQLFloat },
      tag: { type: gql.GraphQLList(gql.GraphQLString) },
      status: { type: gql.GraphQLString },
      createdAt: { type: gql.GraphQLString },
      updatedAt: { type: gql.GraphQLString },
    }
  })
  
  module.exports = tvSeriesSchema
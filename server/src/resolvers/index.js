const {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLTime,
} = require('graphql-iso-date');

const { Query } = require('./Query');
const { Subscription } = require('./Subscription');
const { auth } = require('./Mutation/auth');
const { post } = require('./Mutation/post');
const { AuthPayload } = require('./AuthPayload');

module.exports = {
  Query,
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
  Mutation: {
    ...auth,
    ...post,
  },
  Subscription,
  AuthPayload,
};

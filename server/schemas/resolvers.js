const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne( { email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const token = signToken(user);
            return { token, user };
        },
        saveProduct: async (parent, product, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {saveProduct: product} },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removeProduct: async (parent, { productID }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { saveProduct: product } },
                    { new: true }
                )
                return updatedUser;
            }
        },
        saveTravel: async (parent, { travel }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {saveTravel: travel} },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removeTravel: async (parent, { travelID }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { saveTravel: travelID  } },
                    { new: true }
                )
                return updatedUser;
            }
        }
    }
  };
  
  module.exports = resolvers;
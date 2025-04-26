const { User, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find().populate('thoughts');
    },
    getUser: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    getThoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    getThought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    getMe: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    createThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        if (!thought) {
          throw new AuthenticationError('You can only delete your own thoughts');
        }

        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { thoughts: thoughtId } }
        );

        return thought;
      }
      throw new AuthenticationError('Not authenticated');
    },
    createComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    deleteComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            {
              $pull: {
                comments: {
                  _id: commentId,
                  commentAuthor: context.user.username,
                },
              },
            },
            {
              new: true,
            }
        );

        if (!thought) {
          throw new AuthenticationError('You can only delete your own comments');
        }

        return thought;
      }
      throw new AuthenticationError('Not authenticated');
    },
  },
};

module.exports = resolvers;

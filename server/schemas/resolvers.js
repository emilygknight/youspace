const { User, Thought, Comment, Like, Diary, Follow } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const resolvers = {
  Query: {
    getUsers: async (parent, { limit = 10, skip = 0 }) => {
      return User.find().populate('thoughts').limit(limit).skip(skip);
    },
    getUser: async (parent, { username }) => {
      const user = await User.findOne({ username }).populate('thoughts');
      if (!user) throw new NotFoundError('User not found');
      return user;
    },
    getThoughts: async (parent, { username, limit = 10, skip = 0 }) => {
      const params = username ? { username } : {};
      return Thought.find(params)
          .sort({ createdAt: -1 })
          .populate('comments')
          .limit(limit)
          .skip(skip);
    },
    getThought: async (parent, { thoughtId }) => {
      const thought = await Thought.findOne({ _id: thoughtId }).populate('comments');
      if (!thought) throw new NotFoundError('Thought not found');
      return thought;
    },
    getMe: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('Not authenticated');
    },
    getJournalPrompt: async () => {
      console.log('getJournalPrompt resolver called!');
      try {
        const promptResponse = await model.generateContent({
          contents: [{ parts: [{ text: '15 word count or less, prompt for a journal reflection diary entry' }] }],
        });
        const candidate = promptResponse?.response?.candidates?.[0];
        if (!candidate?.content?.parts?.[0]?.text) {
          throw new Error('No valid prompt generated from AI model.');
        }
        const promptText = candidate.content.parts[0].text;
        console.log('Generated prompt:', promptText);
        return { prompt: promptText };
      } catch (error) {
        console.error('Error generating prompt:', error.message);
        throw new Error(`Failed to generate journal prompt: ${error.message}`);
      }
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      if (!username || !email || !password) {
        throw new Error('Username, email, and password are required');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email format');
      }
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      if (!email || !password) throw new Error('Email and password are required');
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Invalid credentials');
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Invalid credentials');
      const token = signToken(user);
      return { token, user };
    },
    createThought: async (parent, { thoughtText }, context) => {
      if (!thoughtText) throw new Error('Thought text is required');
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });
        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        return thought;
      }
      throw new AuthenticationError('Not authenticated');
    },
    deleteThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });
        if (!thought) throw new AuthorizationError('You can only delete your own thoughts');
        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { thoughts: thoughtId } },
            { new: true }
        );
        return thought;
      }
      throw new AuthenticationError('Not authenticated');
    },
    createComment: async (parent, { thoughtId, commentText }, context) => {
      if (!commentText) throw new Error('Comment text is required');
      if (context.user) {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            {
              $addToSet: {
                comments: { commentText, commentAuthor: context.user.username },
              },
            },
            { new: true, runValidators: true }
        );
        if (!thought) throw new NotFoundError('Thought not found');
        return thought;
      }
      throw new AuthenticationError('Not authenticated');
    },
    deleteComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        const thought = await Thought.findOne({
          _id: thoughtId,
          comments: { $elemMatch: { _id: commentId, commentAuthor: context.user.username } },
        });
        if (!thought) {
          throw new AuthorizationError('Comment not found or you are not authorized to delete it');
        }
        return Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },
  },
};

module.exports = resolvers;
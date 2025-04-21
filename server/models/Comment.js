// ./models/Comment.js
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
    {
        thought: {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            required: true,
        },
        commentText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        commentAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
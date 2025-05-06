import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import dateFormat from '../utils/dateFormat.js';

const likeSchema = new Schema(
    {
        likeAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        thought: {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        toJSON: { getters: true },
        id: false,
    }
);

likeSchema.index({ likeAuthor: 1, thought: 1 }, { unique: true });

const Like = model('Like', likeSchema);

export default Like;

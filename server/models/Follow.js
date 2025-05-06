import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import dateFormat from '../utils/dateFormat.js';

const followSchema = new Schema({
        follower: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        following: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        toJSON: { getters: true },
        id: false,
    }
);

followSchema.index({ follower: 1 });
followSchema.index({ following: 1 });
followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = model('Follow', followSchema);

export default Follow;

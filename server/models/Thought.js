import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import dateFormat from '../utils/dateFormat.js';

const thoughtSchema = new Schema({
      thoughtText: {
        type: String,
        required: 'You need to leave a thought!',
        minlength: 1,
        maxlength: 280,
        trim: true,
      },
      thoughtAuthor: {
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
    });

thoughtSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;

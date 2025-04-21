const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const diarySchema = new Schema({
    entryDate: {
        type: Date,
        required: true,
        default: () => new Date().setHours(0, 0, 0, 0),
    },
    diaryAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    prompt: {
        type: String,
    },
    diaryText: {
        type: String,
        required: 'You need to leave a diary entry!',
        minlength: 1,
        maxlength: 1000,
        trim: true,
    },
    mood: {
        type: String,
        trim: true,
    },
    stickers: [{
        type: String,
    }],
    // Todo duplicate with entrydate? Necessary?
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
}, {
    toJSON: { getters: true },
    id: false,
});

diarySchema.index({ diaryAuthor: 1, entryDate: -1 });


const Diary = model('Diary', diarySchema);

module.exports = Diary;
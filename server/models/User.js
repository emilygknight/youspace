const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Function to determine the zodiac sign based on birthdate
const getZodiacSign = (month, day) => {
  const zodiacSigns = [
    { sign: 'Capricorn', start: '12-22', end: '01-19' },
    { sign: 'Aquarius', start: '01-20', end: '02-18' },
    { sign: 'Pisces', start: '02-19', end: '03-20' },
    { sign: 'Aries', start: '03-21', end: '04-19' },
    { sign: 'Taurus', start: '04-20', end: '05-20' },
    { sign: 'Gemini', start: '05-21', end: '06-20' },
    { sign: 'Cancer', start: '06-21', end: '07-22' },
    { sign: 'Leo', start: '07-23', end: '08-22' },
    { sign: 'Virgo', start: '08-23', end: '09-22' },
    { sign: 'Libra', start: '09-23', end: '10-22' },
    { sign: 'Scorpio', start: '10-23', end: '11-21' },
    { sign: 'Sagittarius', start: '11-22', end: '12-21' }
  ];

  const birthdate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  return zodiacSigns.find(({ start, end }) => (birthdate >= start && birthdate <= end))?.sign || 'Unknown';
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  bio: {
    type: String,
    maxlength: 280,
  },
  profilePicture: {
    type: String,
  },
  city: {
    type: String,
    maxlength: 100,
  },
  state: {
      type: String,
      maxlength: 100,
  },
  country: {
      type: String,
      maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  zodiacSign: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
      diaries: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Diary',
        },
      ],
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Like',
        },
      ],
      followers: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Follow',
        },
      ],
      following: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Follow',
        },
      ],
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
    }
);

userSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
});

userSchema.virtual('diaryCount').get(function () {
  return this.diaries.length;
});

userSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

userSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

userSchema.virtual('followerCount').get(function () {
  return this.followers.length;
});

userSchema.virtual('followingCount').get(function () {
  return this.following.length;
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

    // Calculate and set the zodiac sign based on the birthdate
    if (this.isModified('birthdate') && this.birthdate) {
      const birthMonth = this.birthdate.getMonth() + 1; // getMonth() is 0-based
      const birthDay = this.birthdate.getDate();
      this.zodiacSign = getZodiacSign(birthMonth, birthDay);
    }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = model('User', userSchema);

module.exports = User;

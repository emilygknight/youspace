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
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  zodiacSign: {
    type: String,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
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

const User = model('User', userSchema);

module.exports = User;

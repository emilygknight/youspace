const db = require('../config/connection');
const { User, Thought } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Thought', 'thoughts');
    await cleanDB('User', 'users');

    const createdUsers = await User.create(userSeeds);

    for (const thought of thoughtSeeds) {
      const user = createdUsers.find(
          (user) => user.username === thought.thoughtAuthor
      );

      if (!user) {
        console.error(`Could not find user: ${thought.thoughtAuthor}`);
        continue;
      }

      const createdThought = await Thought.create({
        thoughtText: thought.thoughtText,
        thoughtAuthor: user._id,
      });

      await User.findOneAndUpdate(
          { _id: user._id },
          {
            $addToSet: {
              thoughts: createdThought._id,
            },
          }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
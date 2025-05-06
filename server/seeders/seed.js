import db from '../config/connection.js';
import { User, Thought, Diary, Like, Comment, Follow } from '../models/index.js';
import userSeeds from './userSeeds.json' with { type: "json" };
import thoughtSeeds from './thoughtSeeds.json' with { type: "json" };
import diarySeeds from './diarySeeds.json' with { type: "json" };
import likeSeeds from './likeSeeds.json' with { type: "json" };
import commentSeeds from './commentSeeds.json' with { type: "json" };
import followSeeds from './followSeeds.json' with { type: "json" };
import cleanDB from './cleanDB.js';

console.log("Waiting for DB connection...");
db.once('open', async () => {
  try {
    await cleanDB('Follow', 'follows');
    await cleanDB('Comment', 'comments');
    await cleanDB('Like', 'likes');
    await cleanDB('Diary', 'diaries');
    await cleanDB('Thought', 'thoughts');
    await cleanDB('User', 'users');

    const createdUsers = await User.create(userSeeds);

    const createdThoughts = [];
    for (const thought of thoughtSeeds) {
      const user = createdUsers.find(
          (user) => user.username === thought.thoughtAuthor
      );

      if (!user) {
        console.error(`Could not find user: ${thought.thoughtAuthor} for thought: ${thought.thoughtText}`);
        continue;
      }

      const createdThought = await Thought.create({
        thoughtText: thought.thoughtText,
        thoughtAuthor: user._id,
      });
      createdThoughts.push(createdThought);

      await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { thoughts: createdThought._id } },
          { new: true }
      );
    }

    const userMap = createdUsers.reduce((acc, user) => {
      acc[user.username] = user._id;
      return acc;
    }, {});

    if (diarySeeds && diarySeeds.length > 0) {
      const createdDiaries = await Diary.create(diarySeeds.map(diary => ({
        ...diary,
        diaryAuthor: userMap[diary.diaryAuthor],
      })));
    }

    if (likeSeeds && likeSeeds.length > 0) {
      const createdLikes = await Like.create(likeSeeds.map(like => ({
        likeAuthor: userMap[like.likeAuthor],
        thought: createdThoughts.find(thought => thought.thoughtText.startsWith(like.thought))?._id,
        createdAt: like.createdAt,
      })).filter(like => like.thought));
    }

    if (commentSeeds && commentSeeds.length > 0) {
      const createdComments = await Comment.create(commentSeeds.map(comment => ({
        thought: createdThoughts.find(thought => thought.thoughtText.startsWith(comment.thought))?._id,
        commentText: comment.commentText,
        commentAuthor: userMap[comment.commentAuthor],
        createdAt: comment.createdAt,
      })).filter(comment => comment.thought));
    }

    if (followSeeds && followSeeds.length > 0) {
      const createdFollows = await Follow.create(followSeeds.map(follow => ({
        follower: userMap[follow.follower],
        following: userMap[follow.following],
      })));

      for (const follow of createdFollows) {
        await User.findByIdAndUpdate(follow.follower, { $addToSet: { following: follow.following } });
        await User.findByIdAndUpdate(follow.following, { $addToSet: { followers: follow.follower } });
      }
    }

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
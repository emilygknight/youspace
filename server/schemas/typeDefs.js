const typeDefs = `
  type User {
    _id: ID!
    username: String!
    bio: String
    profilePicture: String
    city: String
    state: String
    country: String
    email: String!
   
    birthdate: String
    zodiacSign: String
    createdAt: String!
    diaries: [Diary!]!
    comments: [Comment!]!
    followers: [User!]!
    following: [User!]!
    thoughts: [Thought!]!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Diary {
    _id: ID!
    entryDate: String!
    diaryAuthor: User!
    prompt: String
    diaryText: String!
    mood: String
    stickers: [String!]
    createdAt: String!
  }

  type Thought {
    _id: ID!
    thoughtText: String!
    thoughtAuthor: User!
    comments: [Comment!]!
   
    likes: [Like!]!
   
    createdAt: String!
  }

  type Like {
    _id: ID!
    likeAuthor: User!
    thought: Thought!
    createdAt: String!
  }

  type Comment {
    _id: ID!
    thought: Thought!
    commentText: String!
    commentAuthor: User!
    createdAt: String!
  }

  type Query {
    # User Queries
    getUsers: [User!]!
    getUser(username: String!): User

    # Thought Queries
    getThoughts(username: String): [Thought!]!
    getThought(thoughtId: ID!): Thought
    getMe: User # Get authenticated user (resolver needs access to auth context)

    # Diary Queries
    getAuthenticatedUserDiaryEntries: [Diary!]!
    getDiaryEntry(diaryId: ID!): Diary

    # Comment Queries
    getComments(thoughtId: ID!): [Comment!]!
    getComment(commentId: ID!): Comment

    # Like Queries
    getLikes(thoughtId: ID!): [Like!]!

    # Follow Queries
    getFollowers(userId: ID!): [User!]!
    getFollowing(userId: ID!): [User!]!
  }

  type Mutation {
    # USER
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(email: String, password: String): User 
    updateUserBio(bio: String): User
    updateUserProfilePicture(profilePicture: String): User
    updateUserLocation(city: String, state: String, country: String): User
    updateUserBirthdate(birthdate: String): User
    updateUserZodiacSign(zodiacSign: String): User

    # DIARY (Author is implicitly the authenticated user in resolver)
    createDiaryEntry(entryDate: String!, diaryText: String!, prompt: String, mood: String): Diary
    updateDiaryEntry(diaryId: ID!, diaryText: String!): Diary
    deleteDiaryEntry(diaryId: ID!): Diary

    # THOUGHT (Author is implicitly the authenticated user in resolver)
    createThought(thoughtText: String!): Thought
    deleteThought(thoughtId: ID!): Thought

    # LIKE (Author is implicitly the authenticated user in resolver)
    createLike(thoughtId: ID!): Thought
    deleteLike(thoughtId: ID!): Thought

    # COMMENT (Author is implicitly the authenticated user in resolver)
    createComment(thoughtId: ID!, commentText: String!): Thought
    deleteComment(thoughtId: ID!, commentId: ID!): Thought

    # FOLLOW (Initiator is implicitly the authenticated user in resolver)
    followUser(followingId: ID!): User
    unfollowUser(followingId: ID!): User
  }
`;

module.exports = typeDefs;
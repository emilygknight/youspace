import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me: getMe {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor {
          _id
          username
        }
        createdAt
      }
    }
  }
`;


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor {
          _id
          username
        }
        createdAt
      }
    }
  }
`;


export const QUERY_USERS = gql`
  query getUsers {
    getUsers {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor {
          _id
          username
        }
        createdAt
      }
    }
  }
`;


export const QUERY_THOUGHT = gql`
  query getThought {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;


export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;


export const QUERY_JOURNAL_PROMPT = gql`
  query getJournalPrompt {
    getJournalPrompt {
      prompt
    }
  }
`;
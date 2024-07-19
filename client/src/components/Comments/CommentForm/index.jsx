import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

import { ADD_COMMENT } from '../../../utils/mutations';

import Auth from '../../../utils/auth';

// Define the CommentForm component, accepting thoughtId as a prop
const CommentForm = ({ thoughtId }) => {

  // Define state variables for comment text and character count
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  // Define the addComment mutation hook with error handling
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username 
          commentAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      // Clear the comment text after successful submission
      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update comment text and character count, ensuring it does not exceed 280 characters
    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        What are your thoughts on this thought?
      </Typography>

      {Auth.loggedIn() ? (
        <>
          <Typography
            variant="body2"
            color={characterCount === 280 || error ? 'error' : 'textSecondary'}
            gutterBottom
          >
            Character Count: {characterCount}/280
            {error && <Alert severity="error" style={{ marginLeft: '1rem' }}>{error.message}</Alert>}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              name="commentText"
              placeholder="Add your comment..."
              value={commentText}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={handleChange}
              style={{ marginBottom: '1rem' }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Comment
            </Button>
          </form>
        </>
      ) : (
        <Typography>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </Typography>
      )}
    </Box>
  );
};

export default CommentForm;

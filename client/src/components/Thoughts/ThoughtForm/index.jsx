import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

// Import GraphQL mutation and queries
import {CREATE_THOUGHT} from '@/utils/mutations.js';
import { QUERY_THOUGHTS, QUERY_ME } from '@/utils/queries.js';

// Import authentication utility
import Auth from '../../../utils/auth';

// Import Material UI components
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

const ThoughtForm = () => {
  // Define state for thoughtText and characterCount
  const [thoughtText, setThoughtText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  // Define the addThought mutation and handle error
  const [createThought, { error }] = useMutation
  (CREATE_THOUGHT, {
    refetchQueries: [
      QUERY_THOUGHTS,
      'getThoughts',
      QUERY_ME,
      'me'
    ]
  });
  // Define the handleFormSubmit function
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createThought({
        variables: {
          thoughtText,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username 
          thoughtAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Create a post</Typography>

      {Auth.loggedIn() ? (
        <>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: characterCount === 280 || error ? 'error.main' : 'text.primary' }}
          >
            Character Count: {characterCount}/280
          </Typography>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ mb: 3 }}
          >
           <TextField
              name="thoughtText"
              placeholder="Here's a new thought..."
              value={thoughtText}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
                Add Thought
            </Button>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
              {error.message}
            </Alert>
            )}
          </Box>
        </>
      ) : (
        <Typography variant="body1">
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </Typography>
      )}
    </Box>
  );
};

export default ThoughtForm;

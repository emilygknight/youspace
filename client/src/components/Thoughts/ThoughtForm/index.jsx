import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../../utils/queries';

import Auth from '../../../utils/auth';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation
  (ADD_THOUGHT, {
    refetchQueries: [
      QUERY_THOUGHTS,
      'getThoughts',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addThought({
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

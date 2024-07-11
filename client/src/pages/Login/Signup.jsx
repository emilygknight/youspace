import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';


import Auth from '../../utils/auth';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box  
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 4,
       }}
       >
    <Box
        sx={{
          width: { xs: '100%', sm: '75%', md: '50%', lg: '40%' },
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Sign Up
        </Typography>
            {data ? (
          <Typography variant="body1">
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </Typography>
            ) : (
              <Box
              component="form"
              onSubmit={handleFormSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Box>
            )}

            {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error.message}
            </Alert>
            )}
      </Box>
    </Box>
  );
};

export default Signup;

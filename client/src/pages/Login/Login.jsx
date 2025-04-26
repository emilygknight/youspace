import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

import { Box, Typography, TextField, Button, Alert } from '@mui/material';


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
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
          Login
        </Typography>

            {data ? (
          <Typography variant="body1">
            Success! You may now head{' '}
           <Link to="/dashboard">back to the homepage.</Link>
          </Typography>
            ) : (
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
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
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600"
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

export default Login;

import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Auth from '../../utils/auth';

// Define a styled component for the header container using Material UI's styled utility
const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1),
  boxShadow: theme.shadows[4],
}));

const Header = () => {
  // Define the logout function to handle user logout
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <HeaderContainer>
      {/* Toolbar for layout structure */}
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side of the header with title and subtitle */}
        <Box>
          <Typography variant="h6" component="div">
            {/* Link to the home page */}
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              youspace
            </Link>
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            placeholder text.
          </Typography>
        </Box>
        {/* Right side of the header with authentication buttons */}
        <Box>
        {/* Conditionally render buttons based on authentication status */}
        {Auth.loggedIn() ? (
        <>
              {/* Button linking to the user's profile */}
              <Button
                component={Link}
                to="/me"
                variant="contained"
                color="primary"
                size="large"
                sx={{ m: 2 }}
              >
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Button>
              {/* Button to logout */}
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ m: 2 }}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Button to login */}
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                size="large"
                sx={{ m: 2 }}
              >
                Login
              </Button>
              {/* Button to sign up */}
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ m: 2 }}
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;

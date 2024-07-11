import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import Auth from '../../utils/auth';

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1),
  boxShadow: theme.shadows[4],
}));


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <HeaderContainer>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              youspace
            </Link>
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            placeholder text.
          </Typography>
        </Box>
        <Box>
        {Auth.loggedIn() ? (
        <>

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

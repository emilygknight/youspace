import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import { Toolbar, Typography, Box } from '@mui/material';
import { Button } from "@/components/ui/button.jsx";

// import { styled } from '@mui/material/styles';

// import Auth from '../../utils/auth';
import {Sparkles} from "lucide-react";

// Define a styled component for the header container using Material UI's styled utility
// const HeaderContainer = styled(Box)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
//   padding: theme.spacing(1),
//   boxShadow: theme.shadows[3],
// }));

const Header = () => {
  // Define the logout function to handle user logout
  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };

  return (
  <header className="container mx-auto py-6 px-4">
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-pink-500" />
        <Link
            className="text-white hover:text-pink-200 hover:no-underline transition delay-200 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            to="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            YouSpace
          </span>
        </Link>
        </div>
      <div className="flex items-center gap-4">
        <Button className="border-2 border-pink-500 bg-gradient-to-r hover:from-pink-300 hover:to-purple-300 transition-colors hover:text-white">
          <Link
              to="/login"
              className="text-gray-600 hover:text-white block w-full h-full flex items-center justify-center"
          >
            Login
          </Link>
        </Button>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-500  hover:from-pink-600 hover:to-purple-600 ">
          <Link
              to="/signup"
              className="text-white hover:text-white transition-colors"
          >
          Sign Up
          </Link>
        </Button>
      </div>
    </nav>
  </header>
  // <HeaderContainer>
  //     {/* Toolbar for layout structure */}
  //     <Toolbar sx={{ justifyContent: 'space-between' }}>
  //       {/* Left side of the header with title and subtitle */}
  //       <Box>
  //         <Typography variant="h6" component="div">
  //           {/* Link to the home page */}
  //           <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
  //             youspace
  //           </Link>
  //         </Typography>
  //         <Typography variant="body2" color="inherit" component="p">
  //           placeholder text.
  //         </Typography>
  //       </Box>
  //       {/* Right side of the header with authentication buttons */}
  //       <Box>
  //       {/* Conditionally render buttons based on authentication status */}
  //       {Auth.loggedIn() ? (
  //       <>
  //             {/* Button linking to the user's profile */}
  //             <Button
  //               component={Link}
  //               to="/me"
  //               variant="contained"
  //               color="primary"
  //               size="large"
  //               sx={{ m: 2 }}
  //             >
  //               {Auth.getProfile().authenticatedPerson.username}'s profile
  //             </Button>
  //             {/* Button to logout */}
  //             <Button
  //               variant="contained"
  //               color="secondary"
  //               size="large"
  //               sx={{ m: 2 }}
  //               onClick={logout}
  //             >
  //               Logout
  //             </Button>
  //           </>
  //         ) : (
  //           <>
  //             {/* Button to login */}
  //             <Button
  //               component={Link}
  //               to="/login"
  //               variant="contained"
  //               color="primary"
  //               size="large"
  //               sx={{ m: 2 }}
  //             >
  //               Login
  //             </Button>
  //             {/* Button to sign up */}
  //             <Button
  //               component={Link}
  //               to="/signup"
  //               variant="contained"
  //               color="secondary"
  //               size="large"
  //               sx={{ m: 2 }}
  //             >
  //               Signup
  //             </Button>
  //           </>
  //         )}
  //       </Box>
  //     </Toolbar>
  //   </HeaderContainer>
  );
};

export default Header;

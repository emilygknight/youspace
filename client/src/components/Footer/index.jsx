import {Link, useLocation, useNavigate} from 'react-router-dom';
// import { Box, Container, Typography, Button } from '@mui/material';
import {HeartIcon, Sparkles} from "lucide-react";

// Define the Footer component
const Footer = () => {
  // Get the current location and navigation functions from React Router
  // const location = useLocation();
  // const navigate = useNavigate();
  
      {/* Footer */}
  return (
  <footer className="container mx-auto py-4 px-4 border-t border-gray-100">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <Sparkles className="h-5 w-5 text-pink-500" />
        <Link to={"/"} className="text-2xl font-bold text-gray-800 hover:text-pink-500 transition-colors">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              YouSpace
            </span>
        </Link>
      </div>
      <div className="flex gap-8">
        <Link
            to="#"
            className="text-gray-600 hover:text-pink-500 transition-colors"
        >
          About
        </Link>
        <Link
            to="#"
            className="text-gray-600 hover:text-pink-500 transition-colors"
        >
          Privacy
        </Link>
        <Link
            to="#"
            className="text-gray-600 hover:text-pink-500 transition-colors"
        >
          Terms
        </Link>
        <Link
            to="#"
            className="text-gray-600 hover:text-pink-500 transition-colors"
        >
          Contact
        </Link>
      </div>
    </div>
    <div className="text-center mt-8 text-gray-500 text-sm">
      © {new Date().getFullYear()} YouSpace. All rights reserved.
    </div>
    <div className="text-center mt-8 text-gray-500 text-xs">
      Made with {"  "} <HeartIcon size={24} className="py-1" style={{ display: 'inline-block', verticalAlign: 'middle' }} /> {"  "} by Emily Knight & Drew Tullos.
    </div>

  </footer>

    // <Box component="footer" sx={{ width: '100%', mt: 'auto', bgcolor: 'secondary.main', p: 4 }}>
    //   <Container sx={{ textAlign: 'center', mb: 5 }}>
    //     {/* Conditionally render the 'Go Back' button if the current path is not the home page */}
    //     {location.pathname !== '/' && (
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         onClick={() => navigate(-1)}
    //         sx={{ mb: 3 }}
    //       >
    //         &larr; Go Back
    //       </Button>
    //     )}
    //     <Typography variant="h4" component="h4">
    //       Made with{' '}
    //       <span role="img" aria-label="heart" aria-hidden="false">
    //         ❤️
    //       </span>{' '}
    //       by Emily Knight.
    //     </Typography>
    //   </Container>
    // </Box>
  );
};

export default Footer;


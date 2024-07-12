import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <Box component="footer" sx={{ width: '100%', mt: 'auto', bgcolor: 'secondary.main', p: 4 }}>
      <Container sx={{ textAlign: 'center', mb: 5 }}>
        {location.pathname !== '/' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ mb: 3 }}
          >
            &larr; Go Back
          </Button>
        )}
        <Typography variant="h4" component="h4">
          Made with{' '}
          <span role="img" aria-label="heart" aria-hidden="false">
            ❤️
          </span>{' '}
          by Emily Knight.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

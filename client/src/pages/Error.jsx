import { useRouteError } from "react-router-dom";
import { Box, Container, Typography, Paper } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Oops!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sorry, an unexpected error has occurred.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <i>{error.statusText || error.message}</i>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
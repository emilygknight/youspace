// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/Comments/CommentList';
import CommentForm from '../components/Comments/CommentForm';

// import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

// Import MUI components
import { Box, Container, Typography, Paper, CircularProgress } from '@mui/material';

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress />
  </Box>
  }
  return (
    <Container>
      <Box my={3}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            {thought.thoughtAuthor} <br />
            <Typography variant="body2" component="span">
              had this thought on {thought.createdAt}
            </Typography>
          </Typography>
          <Box sx={{ p: 2, bgcolor: 'lightgray', border: '2px dotted #1a1a1a' }}>
            <Typography variant="h6" component="blockquote" sx={{ fontStyle: 'italic', lineHeight: 1.5 }}>
              {thought.thoughtText}
            </Typography>
          </Box>
        </Paper>

        <Box my={5}>
          <CommentList comments={thought.comments} />
        </Box>

        <Paper elevation={3} sx={{ m: 3, p: 4, border: '1px dotted #1a1a1a' }}>
          <CommentForm thoughtId={thought._id} />
        </Paper>
      </Box>
    </Container>
  );
};

export default SingleThought;

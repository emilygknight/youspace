import { Link } from 'react-router-dom';
import { Box , Typography, Button } from '@mui/material';

// Define the ThoughtList component with props for thoughts, title, and optional flags for showing title and username
const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  // If there are no thoughts, display a message indicating so
  if (!thoughts.length) {
    return <Typography variant="h3">No Thoughts Yet</Typography>;
  }
  // Render the list of thoughts
  return (
    <Box sx={{ flexDirection: 'row' }}>
      {showTitle && <Typography variant="h3">{title}</Typography>}
      {thoughts &&
        thoughts.map((thought) => (
          <Box key={thought._id} className="posts">
            <Typography variant="h4" sx={{ mb: 2 }}>
              {showUsername ? (
                <Link
                  to={`/profiles/${thought.thoughtAuthor}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {thought.thoughtAuthor} <br />
                  <Box component="span" sx={{ fontSize: '1rem' }}>
                    had this thought on {thought.createdAt}
                  </Box>
                </Link>
              ) : (
                <>
                  <Box component="span" sx={{ fontSize: '1rem' }}>
                    You had this thought on {thought.createdAt}
                  </Box>
                </>
              )}
            </Typography>
            <Box className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </Box>
            <Link to={`/thoughts/${thought._id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ mt: 2, width: '100%' }}>
              Join the discussion on this thought.
              </Button>
            </Link>
          </Box>
        ))}
    </Box>
  );
};

export default ThoughtList;

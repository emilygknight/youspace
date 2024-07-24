import { Box, Typography, Paper, Divider } from '@mui/material';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../../utils/mutations';


const CommentList = ({ comments = [], thoughtId }) => {
  // Define the deleteComment mutation
  const [deleteComment] = useMutation(DELETE_COMMENT);

  // Function to handle comment deletion
  const handleDelete = async (commentId) => {
      try {
        await deleteComment({
          variables: { thoughtId, commentId },
          refetchQueries: [{ query: QUERY_SINGLE_THOUGHT, variables: { thoughtId } }],
        });
      } catch (err) {
        console.error(err);
      }
    };

  if (!comments.length) {
    return (
    <Typography variant="h6" gutterBottom>
      No Comments Yet
    </Typography>
   );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ borderBottom: '1px dotted #1a1a1a', pb: 2 }}>
        Comments
      </Typography>
      <Box display="flex" flexDirection="column" my={4}>
        {comments.map((comment) => (
          <Box key={comment._id} mb={3} pb={3}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: 'darkgray', color: 'white' }}>
              <Typography variant="h6" component="div">
                {comment.commentAuthor} commented{' '}
                <Typography variant="body2" component="span" sx={{ fontSize: '0.825rem' }}>
                  on {comment.createdAt}
                </Typography>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">{comment.commentText}</Typography>
              {(Auth.getProfile().authenticatedPerson.username === comment.commentAuthor ||
                Auth.getProfile().authenticatedPerson.username === thoughtAuthor) && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete Comment
                </Button>
              )}
            </Paper>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default CommentList;

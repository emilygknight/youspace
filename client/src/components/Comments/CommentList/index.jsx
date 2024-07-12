import { Box, Typography, Paper, Divider } from '@mui/material';

const CommentList = ({ comments = [] }) => {
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
            </Paper>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default CommentList;

import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import ThoughtList from '../components/Thoughts/ThoughtList';
import ThoughtForm from '../components/Thoughts/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <Box
      component="main"
      sx={{
        p: 4,
      }}
    >
      <Box
        component="homepage"
        sx={{
          width: { xs: '100%', md: '80%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          gap: 3,
        }}
      >
        <Box component="post"
          sx={{
            width: '60%',
            border: '1px dotted #1a1a1a',
            p: 3,
          }}
        >
          <ThoughtForm />
        </Box>

        <Box
          sx={{
            width: '100%',
          }}
        >
          {loading ? (

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <ThoughtList thoughts={thoughts} title="Thoughts..." />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Home;

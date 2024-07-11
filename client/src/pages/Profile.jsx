// Import necessary hooks and components from react-router-dom and Apollo Client
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// Import custom components for displaying and creating thoughts
import ThoughtForm from '../components/Thoughts/ThoughtForm';
import ThoughtList from '../components/Thoughts/ThoughtList';

// Import GraphQL queries for fetching user data
import { QUERY_USER, QUERY_ME } from '../utils/queries';

// Import authentication utility
import Auth from '../utils/auth';

const Profile = () => {
  // Extract the username parameter from the URL, if it exists
  const { username: userParam } = useParams();

  // Use the useQuery hook to fetch user data based on the presence of the username parameter
  // If userParam exists, use QUERY_USER, otherwise use QUERY_ME
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // Extract the user data from the query response
  const user = data?.me || data?.user || {};
  // Redirect to the "/me" route if the logged-in user is trying to access their own profile
  if (
    Auth.loggedIn() && 
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  // Display a loading message while the query is in progress
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display a message prompting the user to log in if no user data is found
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
// Render the user's profile, including their thoughts and a form for adding new thoughts if viewing their own profile
  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThoughtForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

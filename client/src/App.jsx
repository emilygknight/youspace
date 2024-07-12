import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

// Defining the theme for MUI components
const theme = createTheme({
  palette: {
    primary: {
      light: '#fab950',
      main: '#f9a825',
      dark: '#ae7519',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffefc2',
      main: '#ffecb3',
      dark: '#b2a57d',
      contrastText: '#000',
    },
  },
});

import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client instance with configured middleware and cache
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Main App component
function App() {
  return (

    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
      <div>
        <Header />
        <div>
            <Outlet />
        </div>
        <Footer />
      </div>
      </ThemeProvider>
    </ApolloProvider>

  );
}

export default App;

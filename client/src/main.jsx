import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
// import Home from './pages/Home';
import Home from './pages/Landing/LandingPage.jsx';
import Signup from './pages/Login/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import SingleThought from './pages/SingleThought';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Profile from './pages/Profile';
import Error from './pages/Error';
import NotFound from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      },
      {
       path: "/dashboard",
         element: <Dashboard />
      },
      {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profile/:profileId',
        element: <Profile />
      }, {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />
      },
      {
        path: '/*',
        element: <NotFound />
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

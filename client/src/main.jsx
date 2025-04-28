import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Landing/LandingPage.jsx';
import Signup from './pages/Login/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import SingleThought from './pages/SingleThought';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import Profile from './pages/Profile/Profile.jsx';
import EditProfile from './pages/Profile/ProfileEditPage.jsx';
import Error from './pages/Error';
import NotFound from "./pages/NotFoundPage.jsx";
import DiaryPage from "@/pages/Diary/DiaryPage.jsx";

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
         element: <DashboardPage />
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/profile/edit',
        element: <EditProfile />
      },
      {
        path: '/profile/:profileId',
        element: <Profile />
      }, {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />
      },
      {
        path: '/diary',
        element: <DiaryPage />
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

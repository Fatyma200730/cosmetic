import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutGuest from './Layout/LayoutGuest';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NotFound from './Pages/NotFound';
import Hi from './Pages/Hi';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutGuest />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path:'/login',
        element: <Login />,
      },
      {
        path:'/register',
        element: <Register />,
      },{
        path:'*',
        element:<NotFound/>
      }
    ],
  },{
    path: '/dashboard',
    element: <Hi/>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import './App.css';
import Signin from './pages/auth/Signin';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/auth/Signup';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;

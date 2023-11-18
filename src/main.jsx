import './index.css';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { Images } from './pages/images.jsx';
import { getProducts } from './pages/products/loader.js';
import { ErrorContainer } from './components/errorContainer.jsx';
import { Login } from './pages/login.jsx';
import { 
  createBrowserRouter, 
  RouterProvider,
} from 'react-router-dom';
import { UserContextProvider } from './context/userContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: getProducts,
    errorElement: <ErrorContainer />,
    children: [
      {
        path: 'imagenes',
        element: <Images />
      }
    ]
  },
  {
    path: '/inicio',
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
)

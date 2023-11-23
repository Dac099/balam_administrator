import './index.css';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { Images } from './pages/images/images.jsx';
import { getProducts } from './pages/products/loader.js';
import { ErrorContainer } from './components/errorContainer.jsx';
import { Login } from './pages/login.jsx';
import { 
  createBrowserRouter, 
  RouterProvider,
} from 'react-router-dom';
import { UserContextProvider } from './context/userContext.jsx';
import { AddProduct } from './pages/addProduct/addProduct.jsx';
import { deleteProduct } from './pages/deleteProduct/action.js';
import { getImages } from './pages/images/loader.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: getProducts,
    errorElement: <ErrorContainer />,
    children: [
      {
        path: 'imagenes',
        loader: getImages,
        element: <Images />
      },
      {
        path: 'productos/nuevo',
        element: <AddProduct />
      },
      {
        path: 'productos/:product_id/editar',
        element: <AddProduct />
      },
      {
        path: 'productos/:product_id/eliminar',
        action: deleteProduct,
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

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Main from './Layouts/Main';
import Error from './Pages/Error';
import Home from './Pages/Home';
import Result from './Pages/Result/Result';
import Shop from './Pages/Shop/Shop';
import Discount from './Pages/Discount/Discount';
import SignUp from './Configs/SignUp';
import CategoryPage from './Components/Home/CategoryPage';
import SignIn from './Configs/SignIn';
import AuthProvider from './Configs/AuthContext';
import ShopProfile from './Components/Shop/ShopProfile';
import ProductDetails from './Components/Home/ProductDetails';
import FlashSale from './Pages/FlashSale/FlashSale';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main>Hello world!</Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path:'/result',
        element: <Result/>
      },
      {
        path: '/shop',
        element: <Shop/>
      },
      {
        path: '/discount',
        element: <Discount/>
      },
      {
        path: '/categoryPage/:categoryName',
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/signIn',
        element: <SignIn></SignIn>
      },
      {
        path: '/shopDetail/:shopName',
        element: <ShopProfile></ShopProfile>
      },
      {
        path: '/productDetails/:id',
        element: <ProductDetails></ProductDetails>
      },
      {
        path: '/flashSale',
        element: <FlashSale></FlashSale>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </AuthProvider>
)

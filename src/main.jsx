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
import Dashboard from './Pages/Dashboard/Dashboard';
import Order from './Pages/Dashboard/UserDashboard/Order';
import Cart from './Pages/Dashboard/UserDashboard/Cart';
import Deliveried from './Pages/Dashboard/UserDashboard/Deliveried';
import Dasboard from './Pages/Dashboard/UserDashboard/Dasboard';
import Wishlist from './Pages/Dashboard/UserDashboard/Wishlist';
import Payment from './Pages/Dashboard/UserDashboard/Payment';
import Success from './Pages/Dashboard/UserDashboard/Payment/Success';
import Failed from './Pages/Dashboard/UserDashboard/Payment/Failed';
import Cancel from './Pages/Dashboard/UserDashboard/Payment/Cancel';



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
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'order',
        element: <Order/>
      },
      {
        path: 'cart',
        element: <Cart/>
      },
      {
        path: 'delivery',
        element: <Deliveried/>
      },
      {
        path: 'dasboard',
        element: <Dasboard/>
      },
      {
        path: 'wishlist',
        element: <Wishlist/>
      },
      {
        path:'/dashboard/payment/:payment',
        element: <Payment/>
      },
      {
        path:'/dashboard/success/:tranId',
        element: <Success/>
      },
      {
        path: 'failed',
        element: <Failed/>
      },
      {
        path: 'payment/cancel',
        element: <Cancel/>
      }

    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </AuthProvider>
)

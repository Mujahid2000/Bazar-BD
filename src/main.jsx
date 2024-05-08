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
import PrivateRoutes from './Configs/PrivateRoutes';
import User from './Pages/Dashboard/AdminDashboard/User';
import TotalOrder from './Pages/Dashboard/AdminDashboard/TotalOrder';
import Products from './Pages/Dashboard/AdminDashboard/Products';
import ProductUpolad from './Pages/Dashboard/AdminDashboard/ProductUpolad';
import DetailPayment from './Components/Home/Payment/DetailPayment';



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
      },
      {
        path: '/myPayment/:payment/:id',
        element: <DetailPayment/>
      }
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'order',
        element:<PrivateRoutes> <Order/> </PrivateRoutes> 
      },
      {
        path: 'cart',
        element: <PrivateRoutes> <Cart/> </PrivateRoutes> 
      },
      {
        path: 'delivery',
        element: <PrivateRoutes> <Deliveried/> </PrivateRoutes> 
      },
      {
        path: 'dasboard',
        element: <PrivateRoutes> <Dasboard/> </PrivateRoutes> 
      },
      {
        path: 'wishlist',
        element: <PrivateRoutes> <Wishlist/> </PrivateRoutes> 
      },
      {
        path:'/dashboard/payment/:payment',
        element:<PrivateRoutes> <Payment/> </PrivateRoutes> 
      },
      {
        path:'/dashboard/paid/:tranId',
        element:<PrivateRoutes> <Success/> </PrivateRoutes> 
      },
      {
        path: '/dashboard/failed/:tranId',
        element: <PrivateRoutes><Failed/> </PrivateRoutes>      },
      {
        path: 'payment/cancel',
        element:<PrivateRoutes><Cancel/> </PrivateRoutes> 
      },
      {
        path: 'user',
        element: <User></User>
      },
      {
        path: 'adminOrder',
        element: <TotalOrder></TotalOrder>
      },
      {
        path: 'products',
        element:<PrivateRoutes><Products/> </PrivateRoutes> 
      },
      {
        path: 'addProduct',
        element: <ProductUpolad/>
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

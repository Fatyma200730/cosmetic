import { createBrowserRouter } from "react-router-dom";
import LayoutGuest from "./Layout/LayoutGuest";
import HomePage from "./Pages/GuestPages/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import NotFound from "./Pages/GuestPages/NotFound";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./Pages/defaultPages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute"; 
import Profile from "./Pages/defaultPages/Profile";
import ReviewsPage from "./Pages/defaultPages/ReviewsPage";
import Cart from "./Pages/defaultPages/Cart";
import SearchResults from "./Pages/GuestPages/SearchResults";
import CategoryPage from "./Pages/GuestPages/CategoryPage";
import CartPage from "./Pages/GuestPages/CartPage";
import Products from "./Pages/GuestPages/Products";
import ProductList from "./Pages/defaultPages/ProductList";
import OrdersPage from "./Pages/defaultPages/OrdersPage";
import ProductDetails from "./Pages/GuestPages/ProductDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutGuest />,
    children: [
      { path: "/", element:<GuestRoute><HomePage /></GuestRoute>  },
      { path: "/login", element: <GuestRoute><Login /></GuestRoute> },
      { path: "/register", element: <GuestRoute><Register /></GuestRoute> },
      {path:"/products" ,element:<Products/>},
      {path:"/search" ,element:<SearchResults />},
      {path:"/category/:categoryId" ,element:<CategoryPage />},
      {path:"/product/:id" ,element:<ProductDetails />},
      {path:"/cart" ,element:<CartPage />},
      { path: "*", element: <NotFound /> },
      
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "reviews", element: <ReviewsPage /> },
      {path:"cart" ,element:<Cart />},
      {path:"products" ,element:<ProductList />},
      {path:"orders" ,element:<OrdersPage />},
    ],
  },
]);

export default router;
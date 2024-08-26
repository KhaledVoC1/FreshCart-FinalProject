import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayOut from "./Pages/MainLayOut/MainLayOut";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import CounterContextProvider from "./Context/CounterContext/CounterContext";
import UserContextProvider from "./Context/UserContext/UserContext";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext/CartContext";
import Checkout from "./Pages/Checkout/Checkout";
import AllOrders from "./Context/OrdersContext/OrdersContext "
import ForgotPassword from "./Pages/Login/Forgotpassword"; 
import Brands from "./Pages/Brands/Brands";
import { WishlistContextProvider } from "./Context/WishlistContext/WishlistContext";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Categories from "./Pages/Categories/Categories";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <MainLayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "AllOrders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> }, 
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  const query = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <CartContextProvider>
          <WishlistContextProvider> 
          
            <CounterContextProvider>
              <RouterProvider router={routers} />
              <ReactQueryDevtools />
            </CounterContextProvider>
            
            </WishlistContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

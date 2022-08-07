// import Header from './component/layout/Header/Header';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import WebFont from 'webfontloader';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import store from './store';
// import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products'
import Search from './component/Product/Search'
import LoginSignUp from './component/User/LoginSignUp';
import ProtectedRoute from './component/Route/ProtectedRoute';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { Profile } from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import NotFound from './component/NotFound/NotFound';
import Layout from './component/CustomLayout/Layout'
import './App.css';

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <>
      <Router>
        {/* <Header /> */}
        <Layout>
          {isAuthenticated && <UserOptions user={user} />}
          <Switch>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/product/:id' element={<ProductDetails />} />
            <Route exact path='/products' element={<Products />} />
            <Route path='/products/:keyword' element={<Products />} />
            <Route exact path='/search' element={<Search />} />
            <Route exact path='/login' element={<LoginSignUp />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/forgot"
              element={
                <ForgotPassword />
              }
            />
            <Route exact path="/password/reset/:token" element={<ResetPassword />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/shipping" element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            } />
            <Route exact path='/order/confirm' element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            } />
            {stripeApiKey && (
              <Route exact path='/process/payment' element={
                <Elements stripe={loadStripe(stripeApiKey)} >
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </Elements>}
              />
            )}
            <Route exact path='/success' element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
            />
            <Route exact path='/orders' element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
            />
            <Route exact path='/order/:id' element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
            />
            <Route exact path='/admin/dashboard' element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
            />
            <Route exact path='/admin/products' element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
            />
            <Route exact path='/admin/product/new' element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
            />
            <Route exact path='/admin/product/:id' element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
            />
            <Route exact path='/admin/orders' element={
              <ProtectedRoute isAdmin={true}>
                <OrderList />
              </ProtectedRoute>
            }
            />
            <Route exact path='/admin/order/:id' element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
            />
            <Route exact path='/admin/users' element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
            />
            <Route exact path='/admin/user/:id' element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
            />
            <Route exact path='/admin/reviews' element={
              <ProtectedRoute isAdmin={true}>
                <ProductReviews />
              </ProtectedRoute>
            }
            />
            <Route path='*' element={
              <NotFound />
            }
            />
          </Switch>
        </Layout>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;

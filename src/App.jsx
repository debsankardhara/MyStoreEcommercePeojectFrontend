import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppContext } from './Context/AppContext';
import ShowProduct from './components/product/ShowProduct';
import ProductDetails from './components/product/ProductDetails';
import Navbar from './components/user/Navbar';
import SearchProduct from './components/product/SearchProduct';
import Register from './components/user/Register';
import Login from './components/user/Login';
import ShowCategory from './components/user/ShowCategory';
import Profile from './components/user/Profile';
import Cart from './components/user/Cart';

import Address from './components/user/Address';
import Checkout from './components/user/Checkout';
import OrderConfermation from './components/user/OrderConfermation';
import Footer from './components/user/Footer';

import AdminDashboard from './components/Admin/AdminDashboard'
import Dashboard from './components/Admin/Dashboard';
import Products from './components/Admin/Products';
import Orders from './components/Admin/Orders';
import AdminAddProduct from './components/Admin/AdminAddProduct';
import AdminEditProduct from './components/Admin/AdminEditProduct';


function App() {

  const { products } = useContext(AppContext)

  // console.log(products);


  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<ShowProduct />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path='product/search/:term' element={<SearchProduct />} />
        <Route path="/category/:category" element={<ShowCategory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipAddress" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconfermation" element={<OrderConfermation />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/addproduct" element={<AdminAddProduct />} />
        <Route path="/admin/products/:id" element={<AdminEditProduct />} />
        <Route path="/admin/orders" element={<Orders />} />


      </Routes>

      <Footer />

    </>
  )
}

export default App
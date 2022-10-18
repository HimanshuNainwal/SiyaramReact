import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './App.css';
import Header from './components/Header';
import Home from './pages/home';
import Category from './pages/Category';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';

import { cartActions } from './store/cartSlice'
import { fetchCartData } from './store/cartActions'
import {appendScript} from './lib/appendScript'
import Cart from './pages/Cart';
import { accountAction } from './store/accountSlice';
import {accountDetails} from './store/accountActions'

function App() {
appendScript('https://kit.fontawesome.com/b08b74bd46.js')


  const dispatch = useDispatch()
  const cartState = useSelector(state => state.cart)
  // dispatch(uiActions.toggleLoader(true))
 
  useEffect(()=>{

    

    ( async () => {
      if(localStorage.getItem('customerSession')&&localStorage.getItem('customerId')){
        dispatch(accountAction.setCustomer({customer_session:localStorage.getItem('customerSession'),customer_id:localStorage.getItem('customerId')}))
        await dispatch(accountDetails())
      }
      if (localStorage.getItem('cart_id')&&localStorage.getItem('cart_session')) {
        
        await dispatch(cartActions.setCartInfo({ cartId:localStorage.getItem('cart_id'),cartSession:localStorage.getItem('cart_session')}))
      }
    })()
    
    
  },[dispatch])


  useEffect(()=>{
    
    if(cartState.cartSession && cartState.cartId){
      console.log('cart api fiore')
      dispatch(fetchCartData())
    }
  },[cartState.cartSession,cartState.cartId,dispatch])

  return (
    <Fragment>

      <Header />
      <ToastContainer autoClose={1500} />


      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/category/:category" element={<Category />}  />
        <Route path="/cart" element={<Cart />}  />
        <Route path="/my-profile" element={<Profile />}  />
        <Route path="/checkout" element={<Checkout />}  />
      </Routes>
      

    </Fragment>

  );
}

export default App;

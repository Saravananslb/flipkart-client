import React from 'react';
import { Home } from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Products } from './pages/products/Products';
import { Search } from './pages/search/Search';
import { Checkout } from './pages/checkout/Checkout';
import { ProductDetails } from './pages/productDetails/ProductDetails';
import { Reducer } from './reducer/Reducer';
import { Context } from './Context';
import { useState } from 'react';
import { useReducer } from 'react';
import { SignInUp } from './components/signInUp/SignInUp';
import { cookie, validateUser } from './apiCall';
import { AUTHENTICATE } from './actions/ActionType';
import { useEffect } from 'react';

function App() {
  const [initialState, setInitialState] = useState({
    signInUpEnabled: false,
    signInUpAction: 'LOGIN',
    searchEnabled: false,
    isAuthenticated: false
  });

  useEffect(() => {
    validateAuth();
  }, [])

  const validateAuth = () => {
    validateUser().then(res => {
      if (res.data && res.data.status) {
        cookie.set('Authorization', res.data.authToken);
        dispatch({
          type: AUTHENTICATE,
          payload: {
            isAuthenticated: true
          }
        })
      }
      else {
        cookie.remove('Authorization');
        cookie.remove('mobile');
      }
    })
  }

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={{state, dispatch}}>
    <div className='App'>
      <SignInUp/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/products' element={<Products />} ></Route>
        <Route path='/search' element={<Search />} ></Route>
        <Route path='/cart' element={<Checkout />} ></Route>
        <Route path='/products/:productId' element={<ProductDetails />} ></Route>
      </Routes>
    </BrowserRouter>
    </div>
    </Context.Provider>
  );
}

export default App;

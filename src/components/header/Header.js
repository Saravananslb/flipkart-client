import React from "react";
import "./Header.css";
import { Context } from '../../Context';
import {SIGNIN_UP} from '../../actions/ActionType';
import { cookie } from "../../apiCall";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const handleSignIn = (action) => {
    dispatch({
      type: SIGNIN_UP,
      payload: {
        signInUpEnabled: true,
        signInUpAction: action
      },
    });
  }
  return (
    <>
      <div class="header-container">
            <div onClick={() => navigate('/')}>
                <img width="100" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fk-plus_3b0baa.png"/>
            </div>
            <div>
                <input type="text" name="" id="" placeholder="Search for products, brands and more" class="search" />
            </div>
            <div>
              {state.isAuthenticated ?
                `Hi ${cookie.get('mobile')}` : 
                <button onClick={() => handleSignIn('LOGIN')} style={{color: '#2874f0', border: '1px solid #ffffff'}}>Login</button> }
            </div>
            <div>
                More
            </div>
            <div style={{cursor: 'pointer'}} onClick={() => navigate('/cart')}>
                Cart
            </div>
        </div>
    </>
  );
};

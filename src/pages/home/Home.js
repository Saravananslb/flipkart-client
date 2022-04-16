import React from "react";
import "./Home.css";
import {useNavigate} from 'react-router-dom';
import { Header } from "../../components/header/Header";
const LOGO = require("../../assets/Swiggy_logo.png");

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />

      <div class="category-container">
        <div>
          <img
            class=""
            width="100"
            alt="Top Offers"
            src="https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100"
          />
          <div>Top Offers </div>
        </div>
        <div onClick={() => navigate(`/products?category=GROCERY`)}>
          <img
            class=""
            width="100"
            alt="Top Offers"
            src="https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100"
          />
          <div>Grocery </div>
        </div>
        <div onClick={() => navigate(`/products?category=MOBILES`)}>
          <img
            class=""
            width="100"
            alt="Top Offers"
            src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100"
          />
          <div>Mobiles</div>
        </div>
        <div onClick={() => navigate(`/products?category=FASHION`)}>
          <img
            class=""
            width="100"
            alt="Top Offers"
            src="https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100"
          />
          <div>Fashion</div>
        </div>
        <div onClick={() => navigate(`/products?category=ELECTRONICS`)}>
          <img
            class=""
            width="100"
            alt="Top Offers"
            src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100"
          />
          <div>Electronics</div>
        </div>
        <div onClick={() => navigate(`/products?category=HOME`)}>
          <img
            class=""
            width="100"
            alt="Top Offers"
            src="https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100"
          />
          <div>Home</div>
        </div>
        <div onClick={() => navigate(`/products?category=APPLIANCES`)}>
          <img
            class=""
            width="100"
            alt="Top Offers"
            src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"
          />
          <div>Appliances</div>
        </div>
        <div onClick={() => navigate(`/products?category=TRAVEL`)}>
          <img
            class=""
            width="100"
            alt="Top Offers"
            src="https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100"
          />
          <div>Travel </div>
        </div>
        <div onClick={() => navigate(`/products?category=MORE`)}>
          <img
            class=""
            width="100"
            alt="Top Offers"
            src="https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100"
          />
          <div>Beauty, Toys & More </div>
        </div>
      </div>
      <div>
        <img
          width="100%"
          src="https://rukminim1.flixcart.com/flap/844/140/image/64439b858beef876.jpg?q=50"
          alt=""
        />
      </div>
      <div class="offer-container">
        <div>
          <img
            width="100%"
            height="200"
            src="https://rukminim1.flixcart.com/flap/480/480/image/9e758505ef89426f.jpg?q=50"
            alt=""
          />
        </div>
        <div>
          <img
            width="100%"
            height="200"
            src="https://rukminim1.flixcart.com/flap/480/480/image/d0c8dc5dcfbaba54.jpg?q=50"
            alt=""
          />
        </div>
        <div>
          <img
            width="100%"
            height="200"
            src="https://rukminim1.flixcart.com/flap/480/480/image/9e758505ef89426f.jpg?q=50"
            alt=""
          />
        </div>
        <div>
          <img
            width="100%"
            height="200"
            src="https://rukminim1.flixcart.com/flap/480/480/image/d0c8dc5dcfbaba54.jpg?q=50"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartEmpty } from "../../components/cartEmpty/CartEmpty";
import { Header } from "../../components/header/Header";
import {
  getCartItem,
  getRestaurants,
  addToCart,
  checkout,
  getProducts
} from "../../apiCall";
import "./ProductDetails.css";

export const ProductDetails = () => {

  const navigate = useNavigate();
  let { productId } = useParams();
  const [products, setProducts] = useState({});

  const getProduct = () => {
    getProducts(`productId=${productId}`).then(res => {
      if (res.data && res.data.status) {
        setProducts(res.data.products);
      }
    })
  }

  useEffect(() => {
    getProduct();
  }, [productId])

  let [totalPrice, setTotalPrice] = useState(0);

  const [restaurants, setRestaurants] = useState({});
  const [cart, setCart] = useState([]);

  const handleResChange = (restaurantId) => {
    // getRestaurants(`restaurantId=${restaurantId}`).then((res) => {
    //   setRestaurants(res.data.restaurants[0]);
    // });
  };

  const getCarts = () => {
    getCartItem().then((res) => {
      setCart(res.data.carts ? res.data.carts : []);
      if (res.data.carts) {
        res.data.carts.foods.map((item) => {
          setTotalPrice(totalPrice + item.price * item.count);
        });
      }
    });
  };

  useEffect(() => {
    // handleResChange(restaurantId);
    getCarts();
  }, []);

  const addCart = () => {
    addToCart({productId}).then((res) => {
      if (res.data.status) {
        console.log(res.data)
      }
    });
  };

  const handleCheckout = () => {
    checkout().then((res) => {
      if (res.data.status) {
        getCarts();
      }
    });
  };

  return (
    <>
      <Header />
      {products ?
      <div style={{ position: "relative", top: "100px" }}>
        <div
          class="container"
          // style={{
          //   backgroundColor: "#171a29",
          //   padding: "40px",
          //   color: "#ffffff",
          // }}
        >
          <div class="row">
            <div class="col-4">
              <img
                src={products.image}
                alt=""
                width={300}
                height={400}
              />
              <div className="row" style={{ padding: "10px", textAlign: 'center' }}>
                <div className="col-6">
                  <button className="add-cart-btn" onClick={addCart}>Add to Cart</button>
                </div>
                <div className="col-6">
                  <button className="buy-now-btn">Buy Now</button>
                </div>
              </div>
            </div>

            <div class="col-8 details-container">
              <h5>
                {products.name}
              </h5>
              <div className="row">
                <div class="col-1">
                  {products.rating}{" "}
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                    class="star"
                  />
                </div>
                <div className="col-3">23 Ratings & 4 Reviews</div>
                <div className="col-4">
                  <img
                    src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                    width={80}
                    height={20}
                    alt=""
                  />
                </div>
              </div>
              <div className="row">
                <div class="col-2">
                <h3>₹{(products.price * (100 - products.offers)) / 100}</h3>
                </div>
                <div className="col-1 cut">₹{products.price}</div>
                <div className="col-2" style={{color: '#388e3c'}}>
                {products.offers}% off
                </div>
              </div>
              <div className="row">
                <img src="https://rukminim2.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50" width={100} height={150} alt="" />
              </div>
              <div className="card spec-container">
                <div className="card">
                  <h3>Specifications</h3>
                </div>
                {products.highlights ?
                <>
                {Object.entries(products.highlights.map(item => 
                <div className="row spec">
                  <h5>{item.name}</h5>
                  {Object.entries(item.value).map(([key, value]) => <><div className="col-3">{key}</div><div className="col-8">{value}</div></>)}
                  
                </div>
                ))}
                </> : null}
              </div>
            </div>
          </div>
        </div>
      </div> : null}
    </>
  );
};

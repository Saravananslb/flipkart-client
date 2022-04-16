import React, { useContext } from "react";
import { NoCart } from "../../components/noCart/NoCart";
import { Header } from "../../components/header/Header";
import { getCartItem, addToCart, checkout } from "../../apiCall";
import "./Checkout.css";
import { Context } from "../../Context";

export const Checkout = () => {
  const { state, dispatch} = useContext(Context);
  const [cart, setCart] = React.useState([]);
  let [totalPrice, setTotalPrice] = React.useState({
    totalPrice: 0,
    discount: 0
  });

  const getCarts = () => {
    let tp = 0;
    let dp = 0;
    getCartItem().then((res) => {
      setCart(res.data.carts ? res.data.carts : []);
      if (res.data.carts) {
        res.data.carts.map((item) => {
          tp += ((item.price * item.count) * (100 - item.offers)) / 100;
          dp += ((item.price * item.count) * (item.offers)) / 100;
          setTotalPrice({
            totalPrice: tp,
            discount: dp
          });
        });
      }
    });
  };

  React.useEffect(() => {
    getCarts();
  }, []);

  const handleCount = (productId, count) => {
    if (count <= 0) {
      return;
    }
    addToCart({productId, count}).then(res => {
      console.log(res);
      getCarts();
    })
  }

  const handleCheckout = () => {
    checkout().then((res) => {
      if (res.data.status) {
        getCarts();
      }
    });
  };

  return (
    <>
      <Header location={false} search={false} checkout={true} cart={false} />
      {state.isAuthenticated ? (
        <div style={{ position: "relative", top: "70px" }}>
          <div className="container">
            <div className="row">
              <div className="col-8">
                {cart.map(item =>
                <div class="card" style={{ cursor: "pointer" }}>
                  <div class="card-body">
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={item.image}
                          class="card-img-top"
                          alt="..."
                        />
                        <div className="row" style={{ paddingTop: "10px" }}>
                          <div className="col-3">
                            <button className="minus" onClick={() => handleCount(item.productId, item.count - 1)}>-</button>
                          </div>
                          <div className="col-5">
                            <input
                              type="text"
                              value={item.count}
                              style={{ width: "50px" }}
                              onChange={(e) => handleCount(item.productId, e.target.value)}
                            />
                          </div>
                          <div className="col-3">
                            <button className="plus" onClick={() => handleCount(item.productId, item.count + 1)} >+</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-1"></div>
                      <div className="col-6">
                        <h5
                          class="card-title"
                          style={{ textTransform: "upperCase" }}
                        >
                          {item.name}
                        </h5>
                        <p class="card-text food-card-text-dark"></p>
                        <div class="_9uwBC wY0my">
                          Seller: {"  "} {item.seller} {" "}
                          <img
                            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                            height={21}
                            alt=""
                          />
                        </div>
                        <div className="row">
                          <div class="col-4">
                            <h3>₹{(item.price * (100 - item.offers)) / 100}</h3>
                          </div>
                          <div className="col-3 cut">₹{item.price}</div>
                          <div className="col-3" style={{ color: "#388e3c" }}>
                            {item.offers}% off
                          </div>
                        </div>
                        <div className="row">
                          <h6>REMOVE</h6>
                        </div>
                      </div>
                      <div className="col-3">
                        <div>Delivery by  | Free <span className="cut">₹40</span></div>
                        <span style={{ fontSize: "13px" }}>
                          7 Days Replacement Policy
                        </span>
                      </div>
                    </div>
                  </div>
                </div>)}
                <div class="card" style={{ cursor: "pointer" }}>
                  {cart.length ?
                  <div class="card-body">
                    <div className="container">
                      <div className="row">
                        <div className="col-8"></div>
                        <div className="col-4">
                          <button className="buy-now-btn" onClick={handleCheckout}>PLACE ORDER</button>
                        </div>
                      </div>
                    </div>
                  </div> : null }
                </div>
              </div>
              <div className="col-4">
                <div class="card" style={{ cursor: "pointer" }}>
                  <div class="card-body">
                    <h5>PRICE DETAILS</h5>
                    <hr />
                    <div className="container cart-item">
                      <div className="row">
                        <div className="col-6">Price (2 items)</div>
                        <div className="col-2"></div>
                        <div className="col-4" style={{textAlign: 'right'}}>₹{totalPrice.totalPrice + totalPrice.discount}</div>
                      </div>
                      <div className="row">
                        <div className="col-6">Discount</div>
                        <div className="col-2"></div>
                        <div className="col-4" style={{color: '#388e3c', textAlign: 'right'}}>− ₹{totalPrice.discount}</div>
                      </div>
                      <div className="row">
                        <div className="col-6">Delivery Charges</div>
                        <div className="col-2"></div>
                        <div className="col-4" style={{color: '#388e3c', textAlign: 'right'}}>FREE</div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-6">
                        <h6>Total Amount</h6>
                      </div>
                      <div className="col-3"></div>
                      <div className="col-3">
                        <h6>₹{totalPrice.totalPrice}</h6>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <p style={{color: '#388e3c'}}>You will save ₹{totalPrice.discount} on this order</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      ) : (
        <div class="col">
          <NoCart />
        </div>
      )}
    </>
  );
};

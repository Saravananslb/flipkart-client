import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

export const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        class="card"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/products/${item._id}`)}
      >
        <div class="card-body">
          <div className="row">
            <div className="col-2">
              <img
                src="https://rukminim2.flixcart.com/image/312/312/kmmcrrk0/mobile/y/o/q/8-rmx3085-realme-original-imagfgpgmm6h8ptt.jpeg?q=70"
                class="card-img-top"
                alt="..."
              />
            </div>
            <div className="col-1"></div>
            <div className="col-6">
              <h5 class="card-title" style={{ textTransform: "upperCase" }}>
                {item.name}
              </h5>
              <p class="card-text food-card-text-dark"></p>
              <div class="_9uwBC wY0my">
                <span class="icon-star _537e4"></span>
                <span>
                  {item.rating}{" "}
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
                    class="star"
                  />
                </span>
              </div>
              <div className="row">
                <ul>{Object.entries(item.highlights[0].value).map(([key, value]) => <li>- {key} {"  "} {value}</li>)}
                  
                </ul>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-2">
              <h5>₹ {(item.price * (100 - item.offers)) / 100}</h5>
              <div className="row">
                <span className="cut">₹ {item.price}</span> {item.offers}%
                discount
              </div>
              <div className="row">
                Free Delivery
                <img
                  src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                  height={21}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

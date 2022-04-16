import React from "react";
import { useState, useEffect } from "react";
import { Header } from "../../components/header/Header";
import { getProducts } from "../../apiCall";
import { FoodCard, ProductCard } from "../../components/productCard/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ratings, setRatings] = useState([]);

  const getProduct = () => {
    let brandArr = [];
    let ratingArr = [];
    getProducts(`search=${category}`).then(res => {
      if (res.data && res.data.status) {
        setProducts(res.data.products);
        res.data.products.map(item => {
          brandArr.push(item.brand);
          ratingArr.push(item.rating);
        })
        setBrands([...new Set(brandArr)]);
        setRatings([...new Set(ratingArr)])
      }
    })
  }

  useEffect(() => {
    getProduct();
  }, [category])

  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: "80px" }}>
        <div className="row">
          <div className="col-3">
            <div className="row">
              <h4>Filters</h4>
            </div>
            <hr />
            <div className="row">
              <h4>Price</h4>
              <select class="form-select" aria-label="Default select example">
                <option selected>Minimum</option>
                <option value={1000}>1000</option>
                <option value={10000}>10000</option>
                <option value={100000}>100000</option>
              </select>
              <h6>to</h6>
              <select class="form-select" aria-label="Default select example">
                <option selected>Maximum</option>
                <option value={1000}>1000</option>
                <option value={10000}>10000</option>
                <option value={100000}>100000</option>
              </select>
            </div>
            <hr />
            <h4>Brand</h4>
            <div>
              {brands.map(item =>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={item}
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  {item}
                </label>
              </div>)}
            </div>
            <hr />
            <h4>Customer Rating</h4>
            <div>
              {ratings.map(item =>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  {item}
                </label>
              </div>)}
            </div>
          </div>
          <div className="col-9">
            <h6>Showing {products.length} results for "{category}"</h6>
            {products.map(item => <ProductCard item={item}/>)}
            
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

const Products = ({ state, dispatch }) => {
  const dropRef = useRef();
  const productsRef = useRef();
  const [categArr, setCategArr] = useState();
  const handlecategSelection = async (e) => {
    try {
      let rawData = await fetch(
        `https://fakestoreapi.com/products/category/${e.target.innerHTML}`
      );
      let data = await rawData.json();
      dispatch({ type: "INITIAL_PRODUCT_LOAD", payload: data });
    } catch (error) {
      alert("something went wrong : " + error.message);
    }
  };
  let categObj = {};
  const setCategory = () => {
    state.products
      ? state.products.map((e) => {
          if (categObj[e.category] >= 1)
            categObj[e.category] = categObj[e.category] + 1;
          else categObj[e.category] = 1;
          return e;
        })
      : (categObj["category"] = null);
  };
  useEffect(() => {
    if (state.products.length < 20) {
      //do nothing
    } else {
      setCategory();
      let primArr = [];
      for (let i in categObj) {
        primArr.push(`${i}`);
        setCategArr(primArr);
      }
    }
  }, [state.products]);

  const loadCart = (e, elem) => {
    if (elem.target.innerHTML === "ADD TO CART") {
        let primCart = state.products.filter((itm) => e.id === itm.id);
        let tempArr = primCart.concat(state.cart);
        tempArr.map((e) => {
          e["quantity"] = 1;
          e["inCart"] = true
        });
        dispatch({ type: "CART_LOAD", payload: tempArr });
    } else if (elem.target.innerHTML === "REMOVE FROM CART") {
        let tempArr2 = state.cart.filter((itm) => e.id !== itm.id);
        e["inCart"] = false
        dispatch({ type: "CART_LOAD", payload: tempArr2 });
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="outerBlock">
        <button
          onClick={() => {
            dropRef.current.classList.toggle("show");
          }}
          className="categoryBtn"
        >
          Categories &#11167;
        </button>
        <div className="categorySec" ref={dropRef}>
          <ul>
            {categArr
              ? categArr.map((e, index) => {
                  return (
                    <>
                      <li
                        onClick={(elem) => {
                          dropRef.current.classList.toggle("show");
                          handlecategSelection(elem);
                        }}
                        key={index}
                      >
                        {e}
                      </li>
                      <hr />
                    </>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="container">
          <h1 className="text-center prodHead pageHead">PRODUCTS</h1>
          <div className="prodArea flex">
            {state.products ? (state.products.map((e) => {
                return (
                  <div className="prodCard flex" key={e.id}>
                    <img
                      className="prodImg"
                      src={e.image}
                      alt="Product Image"
                    />
                    <div className="prodData flex">
                      <h3 className="prodTitle">{e.title}</h3>
                      <p className="prodDesc">
                        {e.description.slice(0, 90) + "..."}
                      </p>
                      <p className="prodPrice">
                        <em>{"$ " + e.price}</em>
                      </p>
                      <div className="addRemCart">
                        <button
                          onClick={(elem) => loadCart(e, elem)}
                          className="addCart"
                        >
                          {e.inCart ? "REMOVE FROM CART" : "ADD TO CART"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3>Loading...</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

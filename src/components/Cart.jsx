import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

const Cart = ({ state, dispatch }) => {
    const modalRef = useRef()
    const [qty, setQty] = useState(0)
  const [amount, setAmount] = useState();
  const amtArray = state.cart
    ? state.cart.map((e) => {
        let amt = 0;
        amt =amt+ (e.price * e.quantity)
        return amt;
      })
    : null;
  const totalAmt = amtArray.reduce((p, c) => p + c, 0).toFixed(2);
  useEffect(() => {
    setAmount(totalAmt);
  },);
  const handleAdd = (e) => {
    for (let i of state.cart) {
      i.id === e.id ? (i["quantity"] += 1) : null;
    }
  };
  const handleSub = (e) => {
    for (let i of state.cart) {
      i.id === e.id ? (i["quantity"] -= 1) : null;
      if(i["quantity"] === 0) {
          i["inCart"] = false
          state.cart.splice(state.cart.indexOf(i),1)
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="outerBlock">
        <div className="container">
            <div ref={modalRef} className="modal hidden">
                <h3>Order placed successfully!</h3>
            </div>
          <h1 className="text-center pageHead">SHOPPING CART</h1>
          <div className="total">
            <span>Total : $</span>
            <span>{amount || 0}</span>
          </div>
          <div className="cardArea flex">
            {state.cart
              ? state.cart.map((e) => {
                  return (
                    <div className="cartCard flex">
                      <div>
                        <img
                          src={e.image}
                          alt="Product Image"
                          className="cartProdImg"
                        />
                        <div className="cartProdData">
                          <h3 className="cartProdTitle">{e.title}</h3>
                          <p className="cartProdDesc">
                            {e.description.slice(0, 130) + "..."}
                          </p>
                          <p className="cartProdPrice">$ {e.price}</p>
                        </div>
                      </div>
                      <div className="amount">
                        <button
                          onClick={() => {
                              handleSub(e);
                              setQty(prev => prev - 1)
                          }}
                        >
                          -
                        </button>
                        <p className="quantity">{e.quantity}</p>
                        <button
                          onClick={() => {
                              handleAdd(e);
                              setQty(prev => prev + 1)
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          {state.cart[0] ? <button onClick={()=>{
            modalRef.current ? modalRef.current.classList.toggle("hidden") : null;
            state.cart.map((e)=>{
                e["inCart"] = false
            })
            dispatch({type: "CART_LOAD", payload: []})
            setTimeout(()=>{
                modalRef.current ? modalRef.current.classList.toggle("hidden") : null;
            }, 4000)
          }} className="checkOut">Checkout</button> : <p className="diaLast"><em>NO ITEMS IN THE CART</em></p>}
        </div>
      </div>
    </>
  );
};

export default Cart;

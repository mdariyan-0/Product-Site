import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router"
import { reducerContext } from "../App";

const Navbar = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(reducerContext)
  return <>
    <div className="outerContainer">
        <div className="container flex navbar">
            <div className="logo"><h2>GoMart</h2></div>
            <div className="navigation">
                <ul className="flex lists">
                <li onClick={()=>{
                  navigate("/products")
                }} className="underline">HOME</li>
                <NavLink className="underline" to={"/cart"}><li className="underline">CART<span>{state.cart.length}</span></li></NavLink>
                    <li onClick={()=>{
                      let p = confirm("Are you sure you want to logout?")
                      dispatch({type: "LOG_PROMPT", payload: false})
                      localStorage.removeItem("token")
                      if(p) navigate("/")
                    }} className="underline">LOGOUT</li>
                </ul>
            </div>
        </div>
    </div>
  </>;
};

export default Navbar;

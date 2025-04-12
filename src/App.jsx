import { useState, useReducer, createContext, useCallback, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Products from './components/Products'
import Cart from './components/Cart'
import {HashRouter as Router, Routes, Route} from "react-router"

export const reducerContext = createContext({})
function App() {
  let initialValue = {
    isLoggedIn: false,
    products: "",
    cart: [],
    categories: [],
    inCart: false,
  }
  let commonReducer = (state, action)=>{
    switch (action.type) {
      case "LOG_PROMPT":
        return {...state, isLoggedIn : action.payload};
      case "INITIAL_PRODUCT_LOAD":
        return {...state, products : action.payload};
      case "CART_LOAD":
        return {...state, cart : action.payload}
      case "BTN_VALUE":
        return{...state, btnValue : action.payload}
      default:
        break;
    }
  }
  const [state, dispatch] = useReducer(commonReducer, initialValue)
  
  let contextValue = {state, dispatch}
  const fetchData = useCallback(async () => {
      try {
        let rawData = await fetch("https://fakestoreapi.com/products");
        let data = await rawData.json();
        dispatch({ type: "INITIAL_PRODUCT_LOAD", payload: data });
      } catch (error) {
        alert("something went wrong : " + error.message);
      }
    }, []);
    useEffect(() => {
      fetchData();
    }, []);
  
  return (
    <>
        <reducerContext.Provider value={contextValue}>
    <Router>
      <Routes>
        <Route index element={<Login state={state} dispatch={dispatch}/>}/>
        <Route exact path='/products' element={<Products state={state} dispatch={dispatch}/>}/>
        <Route exact path='/cart' element={<Cart state={state} dispatch={dispatch}/>}/>
      </Routes>
    </Router>
        </reducerContext.Provider>
    </>
  )
}

export default App

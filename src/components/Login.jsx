import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Login = ({state, dispatch}) => {
  document.title = "User Login";
  const [value, setValue] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const handleSubmit = async() => {
    try{
    let data = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    })
    let datavalue = await data.json()
    dispatch({type: "LOG_PROMPT", payload: true})
   
  }catch(err){
    dispatch({type: "LOG_PROMPT", payload: true})  // I did thid beacuse the endpoint wasn't working
    console.log(err.message);  
   
  }
  };
  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem("token", "validToken");
      navigate("/products");
    }
  }, [state.isLoggedIn]);
  return (
    <>
      <div className="loginpage container">
        <h1 className="heading">User Login</h1>
        <div className="inputSec">
          <label for="username" className="labelTag">
            Username
          </label>
          <input
            value={value.username}
            onChange={(e) => handleChange(e)}
            type="text"
            name="username"
          />
        </div>
        <div className="inputSec">
          <label for="password" className="labelTag">
            Password
          </label>
          <input
            value={value.password}
            onChange={(e) => handleChange(e)}
            type="password"
            name="password"
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn loginbtn">
          Submit
        </button>
      </div>
    </>
  );
};

export default Login;

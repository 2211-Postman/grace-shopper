import React from "react";
import { useSelector } from "react-redux";
import Products from "../products/Products";

/**
 * COMPONENT
 */
const Home = (props) => {
  const firstName = useSelector((state) => state.auth.me.firstName);
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Welcome, {firstName}!</h3>
      <br></br>
      <Products />
    </div>
  );
};

export default Home;

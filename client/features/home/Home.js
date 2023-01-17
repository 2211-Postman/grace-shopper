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
      <h3>Welcome, {firstName}</h3>
      <Products />
    </div>
  );
};

export default Home;

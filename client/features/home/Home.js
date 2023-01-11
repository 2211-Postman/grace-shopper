import React from "react";
import { useSelector } from "react-redux";
import Products from "../products/Products";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Products />
    </div>
  );
};

export default Home;

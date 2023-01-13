import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectCart } from "../cart/cartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const cart = useSelector(selectCart);
  const [itemsInCart, setItemsInCart] = useState(cart.quantity);
  useEffect(() => {
    setItemsInCart(cart.quantity);
  }, [cart]);

  const cartDisplay = itemsInCart ? `Cart (${itemsInCart})` : "Cart";
  return (
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn && isAdmin ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/cart">Cart</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : isLoggedIn && !isAdmin ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/cart">Cart</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">{cartDisplay}</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;

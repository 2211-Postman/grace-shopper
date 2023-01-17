import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../cart/cartSlice";

import ResponsiveAppBar from "./ResponsiveAppBar";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin);

  const cart = useSelector(selectCart);
  const [itemsInCart, setItemsInCart] = useState(cart.quantity);
  useEffect(() => {
    setItemsInCart(cart.quantity);
  }, [cart]);
  const cartLabel = itemsInCart ? `Cart (${itemsInCart})` : "Cart";

  // Create page list for navbar
  let pages = ["Shop", "cart"];
  if (isLoggedIn) pages = pages.concat(["logout"]);
  else pages = pages.concat(["login", "signup"]);
  if (isAdmin) pages = ["users"].concat(pages);

  const pageLabels = pages.map((x) => {
    if (x === "cart") return cartLabel;
    else return x;
  });
  const homeTitle = "Kicks";

  return (
    <ResponsiveAppBar
      pages={pages}
      pageLabels={pageLabels}
      homeTitle={homeTitle}
    />
  );
};

export default Navbar;

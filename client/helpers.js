export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getShippingCost = (cart) => {
  // for now shipping costs are fixed
  // we can change this later if we want
  return 15;
};

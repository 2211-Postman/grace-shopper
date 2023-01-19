const router = require("express").Router();

const {
  models: { Order, OrderDetails, User, Product },
} = require("../db");
const { requireToken } = require("../gatekeeper");

module.exports = router;

//all completed orders for a user
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: OrderDetails,
      where: {
        userId: req.params.userId,
        purchased: true,
      },
    });

    if (Number(req.params.userId) !== req.user.id) {
      res.status(403).send("You cannot get other user's orders");
    } else {
      if (orders) {
        const newArr = await orders.map(
          (ele) => (
            (sumPrice = 0),
            (sum = 0),
            ele["orderDetails"].map(
              (orderDetail) => (sumPrice += Number(orderDetail["totalPrice"]))
            ),
            ele["orderDetails"].map(
              (orderDetail) => (sum += orderDetail["numberOfItems"])
            ),
            {
              orderId: ele.id,
              updatedAt: ele.updatedAt,
              orderTotalPrice: sumPrice,
              orderTotalItems: sum,
            }
          )
        );
        res.json(newArr);
      }
    }
  } catch (err) {
    next(err);
  }
});

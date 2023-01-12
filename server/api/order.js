const router = require("express").Router();
const {
  models: { Order, OrderDetails, User, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: OrderDetails,
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     res.json(
//       await Order.create(req.body, {
//         include: OrderDetails,
//       })
//     );
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    console.log("//////////", req.body);
    const { orderDetailsParamsList, ...orderParams } = req.body;
    const order = await Order.create(orderParams);
    for (let i = 0; i < orderDetailsParamsList.length; i++) {
      const params = orderDetailsParamsList[i];
      const orderDetails = await OrderDetails.create(params);
      await orderDetails.setOrder(order);
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: OrderDetails,
    });
    res.json(await order.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    await order.destroy();
    res.json(order);
  } catch (err) {
    next(err);
  }
});

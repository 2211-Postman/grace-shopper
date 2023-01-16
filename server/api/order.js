const router = require("express").Router();
const {
  models: { Order, OrderDetails, User, Product },
} = require("../db");
module.exports = router;

//all orders in db
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: OrderDetails,
    });
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

router.get("/:orderId/:orderDetailsId", async (req, res, next) => {
  try {
    const order = await OrderDetails.findByPk(req.params.orderDetailsId);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post("/user/userId/:productId", async (req, res, next) => {
  try {
    //grab a user's unfulfilled cart
    const existingCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        purchased: false,
      },
    });

    //
    const [orderDetails, isNewOrderDetail] = await OrderDetails.findOrCreate({
      where: {
        orderId: existingCart.id,
        productId: req.params.productId,
      },
      defaults: {
        numberOfItems: req.body.numberOfItems,
        totalPrice: req.body.totalPrice,
      },
    });

    const order = await Order.findByPk(req.params.orderId, {
      include: OrderDetails,
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

///////////////////////psuedo code///////////////////////

/*

1. adding an item to DB: 

get userId. if there is one, then
  get existing order
  add orderdetails
  
  else create new order(cart)

  if no userId, then get/set cart from localStorage

*/

// router.post("/:orderId", async (req, res, next) => {
//   try {
//     const existingCart = await Order.findOne({
//       where: {
//         purchased: false,
//       },
//     });

//     res.json(
//       await OrderDetails.create(req.body, {
//         where: { orderId: req.params.orderId },
//       })
//     );
//   } catch (err) {
//     next(err);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     console.log("//////////", req.body);
//     const { orderDetailsParamsList, ...orderParams } = req.body;
//     const order = await Order.create(orderParams);
//     for (let i = 0; i < orderDetailsParamsList.length; i++) {
//       const params = orderDetailsParamsList[i];
//       const orderDetails = await OrderDetails.create(params);
//       await orderDetails.setOrder(order);
//     }
//     res.json(order);
//   } catch (error) {
//     next(error);
//   }
// });

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

const router = require("express").Router();
const {
  models: { Order, OrderDetails, User, Product },
} = require("../db");
const { requireToken, isAdmin, isAdminOrSelf } = require("../gatekeeper");

module.exports = router;

//get a user's existing cart items
router.get("/getCart/:userId/", requireToken, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      include: { model: OrderDetails },
      where: {
        userId: req.params.userId,
        purchased: false,
      },
    });
    //if cart exists, get all the products in that cart
    if (cart) {
      const products = await OrderDetails.findAll({
        where: { orderId: cart.id },
        include: Product,
      });

      const newArr = await products.map((ele) => ({
        id: ele.product["id"],
        productName: ele.product["productName"],
        color: ele.product["color"],
        brand: ele.product["brand"],
        imageURL: ele.product["imageURL"],
        numberOfItems: ele.numberOfItems,
        size: ele.product["size"],
        unitPrice: ele.product["price"],
        totalPrice: ele.numberOfItems * ele.product["price"],
        orderDetailsId: ele.id,
        userId: cart.userId,
      }));

      res.json({ products: newArr, orderId: cart.id });
    } else {
      //if theres no cart, create one for the user
      const user = await User.findByPk(req.params.userId);
      const newUserCart = await user.createOrder();

      res.json({ products: [], orderId: newUserCart.id });
    }
  } catch (err) {
    next(err);
  }
});

//all orders in db
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: OrderDetails,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:orderId", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: OrderDetails,
    });
    if (order.userId !== req.user.id) {
      res.status(403).send("You cannot get other user's orders");
    } else {
      res.json(order);
    }
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:orderId/:orderDetailsId",
  requireToken,
  async (req, res, next) => {
    try {
      const order = await OrderDetails.findByPk(req.params.orderDetailsId);
      if (order.userId !== req.user.id) {
        res.status(403).send("You cannot get other user's orders");
      } else {
        res.json(order);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/user/:userId/:productId",
  requireToken,
  isAdminOrSelf,
  async (req, res, next) => {
    try {
      //grab a user's unfulfilled cart/order or create a new one for them if it doesnt exist
      const [existingCart, isNewCart] = await Order.findOrCreate({
        where: { userId: req.params.userId, purchased: false },
      });

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

      //if the product exists in cart/order, update quantity
      if (!isNewOrderDetail) {
        await OrderDetails.update(
          {
            numberOfItems: req.body.numberOfItems + orderDetails.numberOfItems,
            totalPrice:
              Number(req.body.totalPrice) + Number(orderDetails.totalPrice),
            productId: req.params.productId,
            orderId: existingCart.id,
          },
          {
            where: {
              productId: req.params.productId,
              orderId: existingCart.id,
            },
            returning: true,
            plain: true,
          }
        );
      }
      const product = await Product.findByPk(req.params.productId, {
        include: { model: OrderDetails },
        where: { orderId: existingCart.id },
      });
      res.status(201).json(orderDetails.id);
    } catch (err) {
      next(err);
    }
  }
);

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

router.put("/:orderId", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: OrderDetails,
    });

    if (order.userId !== req.user.id) {
      res.status(403).send("You cannot update other user's orders");
    } else {
      res.json(await order.update(req.body));
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:orderId", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);

    if (order.userId !== req.user.id) {
      res.status(403).send("You cannot update other user's orders");
    } else {
      await order.destroy();
      res.json(order);
    }
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/orderDetails/:orderDetailsId",
  requireToken,
  async (req, res, next) => {
    try {
      const orderDetails = await OrderDetails.findByPk(
        req.params.orderDetailsId,
        { include: { model: Order } }
      );
      if (orderDetails.order.userId !== req.user.id) {
        res.status(403).send("You cannot update other user's orders");
      } else {
        await orderDetails.destroy();
        res.status(202).send("");
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/orderDetails/:orderDetailsId",
  requireToken,
  async (req, res, next) => {
    try {
      const orderDetails = await OrderDetails.findByPk(
        req.params.orderDetailsId,
        { include: { model: Order } }
      );
      if (orderDetails.order.userId !== req.user.id) {
        res.status(403).send("You cannot update other user's orders");
      } else {
        const { numberOfItems, purchased } = req.body;
        await orderDetails.update({ numberOfItems, purchased });
        res.status(204).send("");
      }
    } catch (err) {
      next(err);
    }
  }
);

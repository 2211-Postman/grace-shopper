const router = require("express").Router();
const {
  models: { Order, OrderDetails, User, Product },
} = require("../db");
module.exports = router;

//get a user's existing cart items
router.get("/getCart/:userId/", async (req, res, next) => {
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
      }));

      res.json(newArr);
    } else {
      //if theres no cart, create one for the user
      const user = await User.findByPk(req.params.userId);
      const newUserCart = await user.createOrder();
      // const products = await OrderDetails.findAll({
      //   include: {
      //     model: Order,
      //     where: { orderId: newUserCart.id },
      //   },
      // });

      res.json([]);
    }
  } catch (err) {
    next(err);
  }
});

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
    console.log("order:", order);

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

router.post("/user/:userId/:productId", async (req, res, next) => {
  try {
    //grab a user's unfulfilled cart/order
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

    //if the product doesnt exist in cart/order yet
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
    res.status(201).json(product);
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

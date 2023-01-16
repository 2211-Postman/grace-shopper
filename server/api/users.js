const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "firstName", "lastName", "email", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["id", "email"],
      include: { model: Order },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/orders/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/orders/:orderId/", async (req, res, next) => {
  try {
    // const order = await Order.findAll({
    //   where: { userId: req.params.userId, id: req.params.orderId },
    // });
    const order = await Order.findByPk(req.params.orderId);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
const { requireToken, isAdmin, isAdminOrSelf } = require("../gatekeeper");

module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  // This route is for admin's to get all user account info
  try {
    const users = await User.findAll({
      // explicitly select only the fields we want - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "firstName", "lastName", "email", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", requireToken, isAdmin, async (req, res, next) => {
  // This route is for admin's to get user account info
  // non admins would get their own user account info with "auth/me"
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

router.get(
  "/:userId/orders/",
  requireToken,
  isAdminOrSelf,
  async (req, res, next) => {
    try {
      const orders = await Order.findAll({
        where: { userId: req.params.userId },
      });
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", requireToken, isAdmin, async (req, res, next) => {
  // This route is for admin's to create user accounts
  // non admins would create their own user accounts with "auth/signup"
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.create({ email, password, firstName, lastName });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", requireToken, isAdminOrSelf, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/:userId",
  requireToken,
  isAdminOrSelf,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);
      await user.destroy();
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

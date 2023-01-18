const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken } = require("../gatekeeper");

module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    res.send({ token: await User.authenticate({ email, password }) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.create({ email, password, firstName, lastName });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

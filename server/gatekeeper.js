// const { User } = require("./db");
const {
  models: { User },
} = require("./db");

const requireToken = async (req, res, next) => {
  const token = req.headers.authorization;
  req.user = await User.findByToken(token);
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("You must be an admin to access this route");
  } else {
    next();
  }
};

const isAdminOrSelf = (req, res, next) => {
  const isSelf = req.user.id === Number(req.params.userId);
  const isAdmin = req.user.isAdmin;
  if (isSelf | isAdmin) {
    next();
  } else {
    return res.status(403).send("You must be an admin to access this route");
  }
};

module.exports = { requireToken, isAdmin, isAdminOrSelf };

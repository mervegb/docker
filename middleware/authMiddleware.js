const protect = (req, res, next) => {
  const { user } = req.session;
  !user && res.status(401).json("Unauthorized");
  req.user = user;
  next();
};

module.exports = { protect };

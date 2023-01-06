const checkRoles = (roles) => (req, res, next) => {
  if (!req.user.role) {
    return handleForbidden(req, res);
  }
  if (!roles.includes(req.user.role)) {
    return handleForbidden(req, res);
  }
  next();
};

const handleForbidden = (req, res) => {
  return res.status(403).json({ message: "Access denied" });
};

module.exports = checkRoles;

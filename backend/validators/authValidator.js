exports.validateRegister = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  next();
};